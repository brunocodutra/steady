function V(value){
  return new numeric.T(
    [[1, 0, value.mag*Math.cos(value.ang*Math.PI/180)], [0, 1, 0], [0, 0, 1]],
    [[0, 0, value.mag*Math.sin(value.ang*Math.PI/180)], [0, 0, 0], [0, 0, 0]]
  );
}

function Is(value){
  return new numeric.T(
    [[1, 0, 0], [0, 1, value.mag*Math.cos(value.ang*Math.PI/180)], [0, 0, 1]],
    [[0, 0, 0], [0, 0, value.mag*Math.sin(value.ang*Math.PI/180)], [0, 0, 0]]
  );
}

function Z(value){
  return new numeric.T(
    [[1, -value.mag*Math.cos(value.ang*Math.PI/180), 0], [0, 1, 0], [0, 0, 1]],
    [[0, -value.mag*Math.sin(value.ang*Math.PI/180), 0], [0, 0, 0], [0, 0, 0]]
  );
}

function Zs(value){
  if(value.mag != 0)
    return new numeric.T(
      [[1, 0, 0], [-Math.cos(-value.ang*Math.PI/180)/value.mag, 1, 0], [0, 0, 1]],
      [[0, 0, 0], [-Math.sin(-value.ang*Math.PI/180)/value.mag, 0, 0], [0, 0, 0]]
    );
  else
    return new numeric.T(
      [[1, 0, 0], [0, 1E-9, 0], [0, 0, 1]],
      [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    );
}

function Xformer(value){
  var n = value.mag;
  if(n == 0)
    n += 1E-9;

  return new numeric.T(
    [[1/n, 0, 0], [0, n, 0], [0, 0, 1]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  );
}

$(".toolbar")
  .on("show.bs.collapse", function(){
    $("~ .schematics", this).css({height: "-=" + $(this).height()});
  })
  .on("hidden.bs.collapse", function(){
    $(this).css({height: ""});
    $("~ .schematics", this).css({height: ""})
  });

$(".toolbar > .left").on("click", function(){
  var roulette = $("~ ul", this);
  $("> :last-child", roulette)
      .css({"opacity": 0})
      .prependTo(roulette)
      .animate({"opacity": 1}, {queue: false});
});

$(".toolbar > .right").on("click", function(){
  var roulette = $("~ ul", this);
  $("> :first-child", roulette)
      .css({"opacity": 0})
      .appendTo(roulette)
      .animate({"opacity": 1}, {queue: false});
});

$(".toolbar > .tools > .tool:not([disabled])")
  .on("click", function(){
    var component = $(this).contents().clone(true, true);
    var active = $(".schematics .active");

    component.css({"opacity": 0}).insertBefore(active);
    if(component.hasClass("branch")){
    var nextBranch = active.nextAll().andSelf().filter(".branch:first");
    if(nextBranch != null)
        component.css({"height": nextBranch.prop("scrollHeight")});

    active
        .parentsUntil(".schematics")
        .andSelf()
        .filter(".component")
        .prevAll()
        .filter(".branch")
        .css({"overflow": "visible"})
        .animate({"height": "+=" + active.width()})
        .css({"overflow": ""});
    }
    component.animate({"opacity": 1});
  });

$('<span class="property remove"><span class="ctrl octicon octicon-x"></span></span>')
  .appendTo(".component:not(.fixed):not(.placeholder)")
  .on("click", function(){
    $(this)
      .parent()
      .closest(".component")
      .animate({"opacity": 0}, {queue: false, done: function(){
        if($(this).hasClass("branch")){
          var nextBranch = $(this).nextAll().filter(".branch:first");
          var offset = $(this).prop("scrollHeight") - (
              nextBranch.length ?
              nextBranch.prop("scrollHeight") :
              $(this).width()
          );

          $(this)
            .parentsUntil(".schematics")
            .andSelf()
            .filter(".component")
            .prevAll()
            .filter(".branch")
            .css({"overflow": "visible"})
            .animate({"height": "-=" + offset + "px"}, {queue: false})
            .css({"overflow": ""});
        }
        $(this).animate({"width": 0}, {queue: false, done: function(){
          $(this).remove()
        }});
      }});
  });

$(".component.r, .component.l, .component.c, .component.z, .component.v, .component.i, .component.xformer")
  .append(
    '<span class="property value">\
      <span class="ctrl mag"><input type="text" class="numeric"><span class="display"></span></span><span class="ctrl angle">&ang;<input type="text" class="numeric"><span class="display"></span>°</span>\
      <span class="prefix"></span></span>\
    </span>'
  );

$(".component:not(.z):not(.v):not(.i) > .property.value > .ctrl.angle").hide();
$(".component > .property.value > .ctrl > input").data({default: 0});
$(".component.xformer > .property.value > .ctrl.mag > input").data({default: 1});

$(".component > .property.value")
  .on("focusin", function(){
    $(this).css({"z-index": 999});
    $(this).animate({left: 0}, {queue: false});
  })
  .on("focusout", function(){
    var left = $(this).css({left: ""}).position().left;
    $(this)
      .css({left: 0})
      .animate({left: left}, {queue: false, done: function(){
        $(this).css({"z-index": ""});
      }});
  });

$(".component.v.series")
  .on("change", function(){
    $(this).data({component: V($("> .property.value", this).data().value)});
  });

$(".component.i.shunt")
  .on("change", function(){
    $(this).data({component: Is($("> .property.value", this).data().value)});
  });

$(".component.r.series, .component.z.series")
  .on("change", function(){
    $(this).data({component: Z($("> .property.value", this).data().value)});
  });

$(".component.r.shunt, .component.z.shunt")
  .on("change", function(){
    $(this).data({component: Zs($("> .property.value", this).data().value)});
  });

$(".component.xformer.series")
  .on("change", function(){
    $(this).data({component: Xformer($("> .property.value", this).data().value)});
  });

$(".component > .property.value")
  .on("change", function(){
    $(this).data({
      value: {
        mag: $("> .ctrl.mag > input", this).val(),
        ang: $("> .ctrl.angle > input", this).val()
      }
    });
  });

$(".component > .property.value > .ctrl")
  .on("click", function(){
    $("> input", this)
      .css({width: $("> .display", this).hide().width()})
      .show()
      .focus()
      .animate({width: "100%"}, {queue: false});
  });

$(".component > .property.value > .ctrl >  input")
  .on("click", function(e){
    e.stopPropagation();
  })
  .on("focusout", function(){
    var display = $("~ .display", this);
    $(this)
      .animate({width: display.width()}, {queue: false, done: function(){
        $(this).css({width: ""}).hide();
        display.show();
      }});
  });

$(".ctrl.mag > input")
  .on("change", function(){
    if($(this).val() == "")
      $(this).val($(this).data().default);

    var val = $(this).val();
    var text = "";
    var prefix = "";

    if(val < 0){
      val = -val;
      text = "-";
    }

    if(val < 1E-15) {
      text += (0).toFixed(0);
    } else if(val < 1E-12) {
      text += (val/1E-15);
      prefix = "f"
    } else if(val < 1E-9) {
      text += (val/1E-12);
      prefix = "p";
    } else if(val < 1E-6) {
      text += (val/1E-9);
      prefix = "n";
    } else if(val < 1E-3) {
      text += (val/1E-6);
      prefix = "μ";
    } else if(val < 1) {
      text += (val/1E-3);
      prefix = "m";
    } else if(val < 1E3) {
      text += (val/1E0);
    } else if(val < 1E6) {
      text += (val/1E3);
      prefix = "k";
    } else if(val < 1E9) {
      text += (val/1E6);
      prefix = "M";
    } else if(val < 1E12) {
      text += (val/1E9);
      prefix = "G";
    } else if(val < 1E15) {
      text += (val/1E12);
      prefix = "T";
    } else {
      text += "∞";
    }

    text = text.substring(0, 4);
    if(text[3] == ".")
      text = text.substring(0, 3);

    $("~ .display", this).html(text).parent().closest(".property").find(".prefix").html(prefix);

  }).trigger("change");

$(".ctrl.angle > input")
  .on("change", function(){
    if($(this).val() == "")
      $(this).val($(this).data().default);

    var val = $(this).val()%360;
    if(val > 180)
      val = val - 360;

    $("~ .display", this).html((val).toFixed(0));
  }).trigger("change");

$(".component:not(.fixed)")
  .on("click", function(event){
    if(event.target == this){
      event.stopPropagation();
      $(".schematics .active").removeClass("active");
      $(this).addClass("active");
    }
  });

$(".numeric").numeric();
