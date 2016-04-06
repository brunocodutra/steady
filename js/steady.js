function rectangular(c){
  if(typeof c.real != "undefined" && typeof c.imag != "undefined")
    return c;
  else
    return {
      real: c.mag*Math.cos(c.ang*Math.PI/180),
      imag: c.mag*Math.sin(c.ang*Math.PI/180)
    };
}

function polar(c){
  if(typeof c.mag != "undefined" && typeof c.ang != "undefined")
    return c;
  else
    return {
      mag: Math.sqrt(c.real*c.real + c.imag*c.imag),
      ang: Math.atan2(c.imag, c.real)*180/Math.PI
    };
}

function V(v){
  v = rectangular(v);
  return new numeric.T(
    [[1, 0, v.real], [0, 1, 0], [0, 0, 1]],
    [[0, 0, v.imag], [0, 0, 0], [0, 0, 0]]
  );
}

function Is(i){
  i = rectangular(i);
  return new numeric.T(
    [[1, 0, 0], [0, 1, i.real], [0, 0, 1]],
    [[0, 0, 0], [0, 0, i.imag], [0, 0, 0]]
  );
}

function Z(z){
  z = rectangular(z);
  return new numeric.T(
    [[1, -z.real, 0], [0, 1, 0], [0, 0, 1]],
    [[0, -z.imag, 0], [0, 0, 0], [0, 0, 0]]
  );
}

function Ys(y){
  y = rectangular(y);
  return new numeric.T(
    [[1, 0, 0], [-y.real, 1, 0], [0, 0, 1]],
    [[0, 0, 0], [-y.imag, 0, 0], [0, 0, 0]]
  );
}

function Zs(z){
  z = polar(z);
  return Ys({mag: 1/z.mag, ang: -z.ang});
}

function Xformer(n){
  n = polar(n);
  return new numeric.T(
    [[1/n.mag, 0, 0], [0, n.mag, 0], [0, 0, 1]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  );
}

function state(i, v){
  i = rectangular(i);
  v = rectangular(v);
  return new numeric.T(
    [i.real, v.real, 1],
    [i.imag, v.imag, 0]
  );
}

$(function() {
  $(".toolbar")
    .on("show.bs.collapse", function(){
      $("~ .schematics", this).addClass("small");
    })
    .on("hide.bs.collapse", function(){
      $("~ .schematics", this).removeClass("small");
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

      component
        .css({"opacity": 0})
        .insertBefore(active)
        .parent().trigger("change");

      if(component.hasClass("branch")){
        var nextBranch = active.nextAll().andSelf().filter(".branch").first();
        if(nextBranch != null)
            component.css({"height": nextBranch.prop("scrollHeight")});

        active
            .parentsUntil(".schematics")
            .andSelf()
            .filter(".component")
            .prevAll()
            .filter(".branch")
            .css({"overflow": "visible"})
            .animate({"height": "+=" + active.outerWidth()})
            .css({"overflow": ""});
      }
      component.animate({"opacity": 1});
    });

  $('<span class="property ctrl remove"><span class="highlight octicon octicon-x"></span></span>')
    .appendTo(".component:not(.earth):not(.placeholder)")
    .on("click", function(){
      $(this)
        .parent()
        .closest(".component")
        .animate({"opacity": 0}, {queue: false, done: function(){
          if($(this).hasClass("branch")){
            var nextBranch = $(this).nextAll().filter(".branch").first();
            var offset = $(this).prop("scrollHeight") - (
                nextBranch.length ?
                nextBranch.prop("scrollHeight") :
                $(this).outerWidth()
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
            var parent = $(this).parent();
            $(this).remove();
            parent.trigger("change");
          }});
        }});
    });

  $(".component.r, .component.l, .component.c, .component.z, .component.v, .component.i, .component.xformer")
    .append(
      '<span class="property value highlight">\
        <span class="ctrl mag"><input type="text" class="numeric"><span class="display"></span></span><span class="ctrl ang">&ang;<input type="text" class="numeric"><span class="display"></span>°</span>\
        <span class="prefix"></span></span>\
      </span>'
    );

  $(".component:not(.z):not(.v):not(.i) > .property.value > .ang").hide();

  $(".component")
    .append(
      '<span class="property v highlight">\
        <span class="mag"><input readonly="readonly" type="text" class="numeric"><span class="display"></span></span><span class="ang">&ang;<input readonly="readonly" type="text" class="numeric"><span class="display"></span>°</span>\
        <span class="prefix"></span></span>\
      </span>\
      <span class="property i highlight">\
        <span class="mag"><input readonly="readonly" type="text" class="numeric"><span class="display"></span></span><span class="ang">&ang;<input readonly="readonly" type="text" class="numeric"><span class="display"></span>°</span>\
        <span class="prefix"></span></span>\
      </span>'
    );

  $(".component > .property input").data({default: 0});
  $(".component.xformer > .property.value > .mag > input").data({default: 1});
  $(".component > .property.value input")
    .each(function(){
        $(this).val($(this).data().default);
    });

  $(".schematics, .components, .component")
    .data({
      value: Z({real: 0, imag: 0}),
      state: state({real: 0, imag: 0}, {real: 0, imag: 0})
    });

  $(".components")
    .on("change", function(){
      var components = Z({real: 0, imag: 0});
      $("> .component", this).each(function(){
          components = $(this).data().value.dot(components);
      });
      $(this).data({value: components});
    })
    .on("update", function(e){
      e.stopPropagation();
      $("> .component", this)
        .first()
        .data({state: $(this).data().state})
        .triggerHandler("update");
    });

  $(".component")
    .on("update", function(e){
      e.stopPropagation();
      var v = $(this).data().state.get([0]);
      var i = $(this).data().state.get([1]);

      v = polar({real: v.x, imag: v.y});
      i = polar({real: i.x, imag: i.y});

      $("> .property.v > .mag > input", this).val(v.mag).triggerHandler("change");
      $("> .property.v > .ang > input", this).val(v.ang).triggerHandler("change");

      $("> .property.i > .mag > input", this).val(i.mag).triggerHandler("change");
      $("> .property.i > .ang > input", this).val(i.ang).triggerHandler("change");

      $("+ .component", this)
        .data({state: $(this).data().value.dot($(this).data().state)})
        .triggerHandler("update");
    });

  $(".component.v.series")
    .on("change", function(){
      $(this).data({value: V($("> .property.value", this).data().value)});
    });

  $(".component.i.shunt")
    .on("change", function(){
      $(this).data({value: Is($("> .property.value", this).data().value)});
    });

  $(".component.r.series, .component.z.series")
    .on("change", function(){
      $(this).data({value: Z($("> .property.value", this).data().value)});
    });

  $(".component.r.shunt, .component.z.shunt")
    .on("change", function(){
      $(this).data({value: Zs($("> .property.value", this).data().value)});
    });

  $(".component.xformer.series")
    .on("change", function(){
      $(this).data({value: Xformer($("> .property.value", this).data().value)});
    });

  $(".schematics, .component.branch")
    .on("change", function(){
      var components = $("> .components", this).data().value;

      y = components.get([1, 0]).div(components.get([1, 1]));
      y.x = y.x ? y.x : 0;
      y.y = y.y ? y.y : 0;

      i = components.get([1, 2]).div(components.get([1, 1]));
      i.x = i.x ? i.x : 0;
      i.y = i.y ? i.y : 0;

      $(this).data({value: Ys({real: -y.x, imag: -y.y}).dot(Is({real: i.x, imag: i.y}))});
    })
    .on("update", function(e){
      e.stopPropagation();
      var v = $(this).data().state.get([0]);
      $("> .components", this)
        .data({state: $(this).data().value.inv().dot(state({real: v.x, imag: v.y}, {real: 0, imag: 0}))})
        .triggerHandler("update");
    });

  $(".schematics")
    .on("change", function(){
      $(this).triggerHandler("update");
    });

  $(".component > .property:has(input)")
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
    })
    .on("change", function(){
      $(this).data({
        value: {
          mag: $("> .mag > input", this).val()*1,
          ang: $("> .ang > input", this).val()*1
        }
      });
    });

  $(".component > .property > .mag, .component > .property > .ang")
    .on("click", function(){
      $("> input", this)
        .css({width: $("> .display", this).hide().outerWidth()})
        .show()
        .focus()
        .animate({width: "100%"}, {queue: false});
    });

  $(".component > .property > .mag")
    .on("focusin", function(){
      $("~ .prefix", this).hide();
    })
    .on("focusout", function(){
      $("~ .prefix", this).show();
    });

  $(".component > .property input")
    .on("click", function(e){
      e.stopPropagation();
    })
    .on("focusout", function(){
      var display = $("~ .display", this);
      $(this)
        .animate({width: display.outerWidth()}, {queue: false, done: function(){
          $(this).css({width: ""}).hide();
          display.show();
        }});
    });

  $(".mag > input")
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

  $(".ang > input")
    .on("change", function(){
      if($(this).val() == "")
        $(this).val($(this).data().default);

      var val = $(this).val()%360;
      if(val > 180)
        val = val - 360;

      $("~ .display", this).html((val).toFixed(0));
    }).trigger("change");

  $(".component:not(.earth)")
    .on("click", function(event){
      event.stopPropagation();
      $(".schematics .active").removeClass("active");
      $(this).addClass("active");
    });

  $(".numeric").numeric();
});
