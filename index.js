!function(e){function t(t){for(var r,c,i=t[0],s=t[1],l=t[2],d=0,m=[];d<i.length;d++)c=i[d],a[c]&&m.push(a[c][0]),a[c]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(u&&u(t);m.length;)m.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var s=n[i];0!==a[s]&&(r=!1)}r&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={0:0},o=[];function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/steady/";var i=window.webpackJsonp=window.webpackJsonp||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var u=s;o.push([0,1]),n()}({"+era":function(e,t,n){"use strict";n.d(t,"a",function(){return u});var r=n("q1tI"),a=n.n(r),o=n("o40e"),c=n("/1WU"),i=n("nsum"),s=n("uDhx"),l=n("aT25");const u=n("7czd");t.b=Object(o.a)(e=>{let t=e.vi,n=t[0],r=t[1],o=e.element,d=e.active,m=e.activate,v=e.remove,p=e.update;return a.a.createElement(i.a,{active:d,activate:m,remove:v,className:o.kind},a.a.createElement(u,null),a.a.createElement(s.a,{value:o.value,description:"voltage",unit:l.b.volt,onChange:p}),a.a.createElement(c.a,{value:n,unit:l.b.volt}),a.a.createElement(c.a,{value:r,unit:l.b.ampere}))})},"/1WU":function(e,t,n){"use strict";var r=n("TSYQ"),a=n.n(r),o=n("q1tI"),c=n.n(o),i=n("aT25"),s=n("YLfQ"),l=n("Vb/u");const u=n("kCCV"),d=n("q4hS"),m=e=>{switch(e.unit){case i.b.volt:return c.a.createElement(u,null);case i.b.ampere:return c.a.createElement(d,null)}};t.a=class extends c.a.PureComponent{constructor(e){super(e),this.onFocus=(()=>{this.setState({show:!0})}),this.onBlur=(()=>{this.setState({show:!1})}),this.state={show:!1}}render(){const e=this.state.show;return c.a.createElement(c.a.Fragment,null,c.a.createElement(s.a,{action:()=>null,onFocus:this.onFocus,onBlur:this.onBlur,className:a()("status control fade",this.props.unit)},c.a.createElement(m,{unit:this.props.unit})),c.a.createElement("span",{className:a()("status tooltip fade",{show:e})},c.a.createElement("span",{className:"arrow"}),c.a.createElement("span",{className:"tooltip-inner"},c.a.createElement(l.a,{value:this.props.value,unit:this.props.unit}))))}}},0:function(e,t,n){n("2YZa"),e.exports=n("Hglc")},"2YZa":function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),a=n.n(r),o=n("i8i4"),c=n.n(o),i=n("/MKj"),s=n("hrwi"),l=n("NldC"),u=(n("OG14"),n("ANjH")),d=n("Jvvb"),m=n("5G8z"),v=n("okZy"),p=n("GDKA");const h=(e,t,n)=>[...e.slice(0,t),e[t]+n,...e.slice(t+1)],f=(e,t,n)=>1===t.length&&0===t[0]?n(e):t.length>1&&0===t[0]?Object(p.g)(e,f(Object(p.b)(e),t.slice(1),n)):Object(p.e)(e,f(Object(p.j)(e),h(t,0,-1),n));var b=function(e,t){void 0===e&&(e=Object(m.a)());const n=e,r=n.entry,a=n.active;switch(t.type){case d.a.activate:return{entry:r,active:t.id};case d.a.insert:return{entry:f(r,a,e=>Object(p.e)(Object(p.f)(t.kind),e)),active:h(a,a.length-1,1)};case d.a.remove:const n=t.id.slice(0,-1);return{entry:f(r,t.id,p.j),active:Object(v.b)(n,a)&&t.id[n.length]<a[n.length]?h(a,n.length,-1):a};case d.a.update:return{entry:f(r,t.id,e=>Object(p.l)(e,t.value)),active:a};default:return e}};var k=function(e,t){switch(void 0===e&&(e=Object(m.a)()),t.type){case d.a.hydrate:return t.state;default:return b(e,t)}};const E=[e=>{let t=e.getState;return e=>n=>{const r=e(n);return[d.a.insert,d.a.remove,d.a.update].includes(n.type)&&history.pushState(Object(m.b)(t()),document.title,`${location.origin}${location.pathname}`),r}}];const j=Object(m.e)(location.search.slice(1))||Object(m.a)(),g=u.c(k,j,u.a(...E));document.addEventListener("keypress",e=>{null===history.state||"z"!==e.key&&"Z"!==e.key||!e.ctrlKey||e.shiftKey||history.back()}),document.addEventListener("keypress",e=>{!e.ctrlKey||("z"!==e.key&&"Z"!==e.key||!e.shiftKey)&&("y"!==e.key&&"Y"!==e.key||e.shiftKey)||history.forward()}),history.replaceState(null,document.title,`${location.origin}${location.pathname}`),window.onpopstate=(e=>{let t=e.state;return g.dispatch(Object(d.c)(null!==t?Object(m.d)(t):j))});var O=g;c.a.render(a.a.createElement(i.a,{store:O},a.a.createElement(s.a,null)),Object(l.a)(document.getElementById("steady"),"#steady not found"))},"5G8z":function(e,t,n){"use strict";n.d(t,"a",function(){return l}),n.d(t,"b",function(){return u}),n.d(t,"d",function(){return d}),n.d(t,"c",function(){return m}),n.d(t,"e",function(){return v});var r=n("+00W"),a=n.n(r),o=n("HlZf"),c=n.n(o),i=n("GDKA");const s=e=>Object(i.i)(Object(i.d)(e)),l=e=>{const t=s(e);return{entry:t,active:[Object(i.c)(t)]}},u=e=>{let t=e.entry,n=e.active;return[Object(i.h)(t.next&&t.next.next),n]},d=e=>{if(!Array.isArray(e)||2!==e.length||!Array.isArray(e[1])||!e[1].every(Number.isInteger))throw new Error(`expected '[entry, active]', got ${e}`);return{entry:s(Object(i.k)(e[0])),active:e[1]}},m=e=>a.a.encode(c.a.encode(u(e))),v=e=>{try{return d(c.a.decode(a.a.toBuffer(e)))}catch(e){return}}},"5muy":function(e,t,n){"use strict";n.d(t,"b",function(){return a}),n.d(t,"d",function(){return o}),n.d(t,"e",function(){return c}),n.d(t,"g",function(){return i}),n.d(t,"c",function(){return s}),n.d(t,"f",function(){return l}),n.d(t,"a",function(){return u});var r=n("D5DN");const a=[[r._1,r._0],[r._0,r._1]],o=function(e,t){return void 0===e&&(e=a),void 0===t&&(t=[r._0,r._0]),{r:e,t:t}},c=e=>{return e.r},i=e=>{return e.t},s=(e,t)=>{let n=e.r,a=n[0],o=a[0],c=a[1],i=n[1],s=i[0],l=i[1],u=e.t,d=u[0],m=u[1],v=t[0],p=t[1];return[Object(r.add)(Object(r.add)(Object(r.mul)(o,v),Object(r.mul)(c,p)),d),Object(r.add)(Object(r.add)(Object(r.mul)(s,v),Object(r.mul)(l,p)),m)]},l=function(e,t){let n=e.r,a=n[0],o=a[0],c=a[1],i=n[1],s=i[0],l=i[1],u=e.t,d=u[0],m=u[1],v=void 0===t?[r._0,r._0]:t,p=v[0],h=v[1];const f=Object(r.div)(Object(r.sub)(Object(r.sub)(h,m),Object(r.mul)(s,p)),l);return[Object(r.add)(Object(r.add)(Object(r.mul)(o,p),Object(r.mul)(c,f)),d),f]},u=(e,t)=>{const n=e.r,a=n[0],c=a[0],i=a[1],l=n[1],u=l[0],d=l[1],m=t.r,v=m[0],p=v[0],h=v[1],f=m[1],b=f[0],k=f[1];return o([[Object(r.add)(Object(r.mul)(p,c),Object(r.mul)(h,u)),Object(r.add)(Object(r.mul)(p,i),Object(r.mul)(h,d))],[Object(r.add)(Object(r.mul)(b,c),Object(r.mul)(k,u)),Object(r.add)(Object(r.mul)(b,i),Object(r.mul)(k,d))]],s(t,e.t))}},"5sdT":function(e,t,n){"use strict";n.d(t,"a",function(){return u});var r=n("q1tI"),a=n.n(r),o=n("o40e"),c=n("/1WU"),i=n("nsum"),s=n("uDhx"),l=n("aT25");const u=n("kSts");t.b=Object(o.a)(e=>{let t=e.vi,n=t[0],r=t[1],o=e.element,d=e.active,m=e.activate,v=e.remove,p=e.update;return a.a.createElement(i.a,{active:d,activate:m,remove:v,className:o.kind},a.a.createElement(u,null),a.a.createElement(s.a,{name:"y",value:o.value.y,description:"propagation constant",onChange:e=>p(Object.assign({},o.value,{y:e}))}),a.a.createElement(s.a,{name:"z",value:o.value.z,description:"characteristic impedance",unit:l.b.ohm,onChange:e=>p(Object.assign({},o.value,{z:e}))}),a.a.createElement(c.a,{value:n,unit:l.b.volt}),a.a.createElement(c.a,{value:r,unit:l.b.ampere}))})},"7czd":function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,[r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M1277 666c223-333 223 333 446 0m149.2858-249.21516l167 .00002m-83.5 83.49998V333.28486M0 667l1166-1M0 2333h3000M1833 666l1167 1",key:0}),r.createElement("circle",{cx:"1500",cy:"666",r:"333",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",key:1})])}a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},Atg9:function(e,t,n){"use strict";var r=n("TSYQ"),a=n.n(r),o=n("q1tI"),c=n.n(o),i=n("i8i4"),s=n.n(i),l=n("YLfQ"),u=n("NldC"),d=class extends c.a.PureComponent{constructor(){super(...arguments),this.toggler=Object(u.a)(document.getElementById("toggler"),"#toggler not found")}render(){return s.a.createPortal(c.a.createElement(l.a,{action:this.props.toggle,className:"toggler"}),this.toggler)}},m=n("/MKj"),v=n("Jvvb");var p=Object(m.b)(null,(e,t)=>({insert:()=>{e(v.d(t.kind))}}))(e=>{let t=e.kind,n=e.insert,r=e.children;return c.a.createElement(l.a,{action:n,className:a()("tool",t)},r)}),h=n("GDKA"),f=n("foLc"),b=n("NijR"),k=n("Sj01"),E=n("5sdT"),j=n("uim1"),g=n("+era"),O=n("BFWM");t.a=class extends c.a.PureComponent{constructor(e){super(e),this.toggle=(()=>{this.setState(e=>{return{open:!e.open}})}),this.state={open:!0}}render(){const e=this.state.open;return c.a.createElement(c.a.Fragment,null,c.a.createElement(d,{toggle:this.toggle}),c.a.createElement("div",{className:a()("toolbox",{open:e})},c.a.createElement(p,{kind:h.a.vsrc},c.a.createElement(g.a,null)),c.a.createElement(p,{kind:h.a.isrc},c.a.createElement(k.a,null)),c.a.createElement(p,{kind:h.a.impedance},c.a.createElement(b.a,null)),c.a.createElement(p,{kind:h.a.admittance},c.a.createElement(f.a,null)),c.a.createElement(p,{kind:h.a.xformer},c.a.createElement(O.a,null)),c.a.createElement(p,{kind:h.a.line},c.a.createElement(E.a,null)),c.a.createElement(p,{kind:h.a.shunt},c.a.createElement(j.a,null))))}}},BFWM:function(e,t,n){"use strict";n.d(t,"a",function(){return u});var r=n("q1tI"),a=n.n(r),o=n("o40e"),c=n("/1WU"),i=n("nsum"),s=n("uDhx"),l=n("aT25");const u=n("s/hM");t.b=Object(o.a)(e=>{let t=e.vi,n=t[0],r=t[1],o=e.element,d=e.active,m=e.activate,v=e.remove,p=e.update;return a.a.createElement(i.a,{active:d,activate:m,remove:v,className:o.kind},a.a.createElement(u,null),a.a.createElement(s.a,{value:o.value,description:"transformer ratio",unit:l.b.ratio,onChange:p}),a.a.createElement(c.a,{value:n,unit:l.b.volt}),a.a.createElement(c.a,{value:r,unit:l.b.ampere}))})},D5DN:function(e,t,n){"use strict";n.d(t,"_0",function(){return a}),n.d(t,"_1",function(){return o}),n.d(t,"pack",function(){return c}),n.d(t,"unpack",function(){return i});var r=n("/TNE");n.o(r,"add")&&n.d(t,"add",function(){return r.add}),n.o(r,"angle")&&n.d(t,"angle",function(){return r.angle}),n.o(r,"cosh")&&n.d(t,"cosh",function(){return r.cosh}),n.o(r,"div")&&n.d(t,"div",function(){return r.div}),n.o(r,"isPhasor")&&n.d(t,"isPhasor",function(){return r.isPhasor}),n.o(r,"mul")&&n.d(t,"mul",function(){return r.mul}),n.o(r,"neg")&&n.d(t,"neg",function(){return r.neg}),n.o(r,"norm")&&n.d(t,"norm",function(){return r.norm}),n.o(r,"polar")&&n.d(t,"polar",function(){return r.polar}),n.o(r,"rect")&&n.d(t,"rect",function(){return r.rect}),n.o(r,"sinh")&&n.d(t,"sinh",function(){return r.sinh}),n.o(r,"sub")&&n.d(t,"sub",function(){return r.sub});const a=Object(r.polar)(0),o=Object(r.polar)(1),c=e=>[e.mag,e.tan],i=e=>{if(!Array.isArray(e)||2!==e.length)throw new Error(`expected '[mag, tan]', got ${e}`);return{mag:+e[0],tan:+e[1]}}},EwVf:function(e,t,n){"use strict";var r=n("/MKj"),a=n("Jvvb"),o=n("hGe5");const c=(e,t)=>({remove:()=>{e(a.e(t.id))}});t.a=(e=>Object(o.a)(Object(r.b)(null,c)(e)))},FrQ7:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M1500 2666v-333m-334 333h667m-567 111h478m-412 111h334m1334-555H1500V666h1500"}))}a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},Ft0v:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M0 667h3000m-1500 333V667M0 2333h3000m-1500-333h-167V1000h333v1000h-166zm0 333v-333"}))}a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},GDKA:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"d",function(){return l}),n.d(t,"i",function(){return u}),n.d(t,"c",function(){return d}),n.d(t,"f",function(){return p}),n.d(t,"j",function(){return h}),n.d(t,"e",function(){return f}),n.d(t,"b",function(){return b}),n.d(t,"g",function(){return k}),n.d(t,"l",function(){return E}),n.d(t,"h",function(){return g}),n.d(t,"k",function(){return O});n("rGqo");var r,a=n("D5DN"),o=n("5muy");!function(e){e.connector="connector",e.ground="ground",e.vsrc="vsrc",e.isrc="isrc",e.impedance="impedance",e.admittance="admittance",e.xformer="xformer",e.line="line",e.series="series",e.shunt="shunt"}(r||(r={}));const c=e=>e.kind!==r.connector?Object(o.a)(e.model,c(e.next)):e.model,i={kind:r.connector,next:void 0,value:void 0,model:Object(o.d)(),level:0},s=()=>i,l=function(e){return void 0===e&&(e=s()),{kind:r.ground,next:e,value:void 0,model:Object(o.d)(),level:e.level}},u=function(e){return void 0===e&&(e=s()),{kind:r.series,next:e,value:void 0,model:c(e),level:e.level}},d=e=>e.kind===r.connector?0:1+d(e.next),m=e=>{switch(e.kind){case r.connector:return s();case r.ground:return l(e.next);case r.vsrc:return function(e,t){return void 0===e&&(e=s()),void 0===t&&(t=a._0),{kind:r.vsrc,next:e,value:t,model:Object(o.d)(o.b,[t,a._0]),level:e.level}}(e.next,e.value);case r.isrc:return function(e,t){return void 0===e&&(e=s()),void 0===t&&(t=a._0),{kind:r.isrc,next:e,value:t,model:Object(o.d)(o.b,[a._0,t]),level:e.level}}(e.next,e.value);case r.impedance:return function(e,t){return void 0===e&&(e=s()),void 0===t&&(t=a._0),{kind:r.impedance,next:e,value:t,model:Object(o.d)([[a._1,Object(a.neg)(t)],[a._0,a._1]]),level:e.level}}(e.next,e.value);case r.admittance:return function(e,t){return void 0===e&&(e=s()),void 0===t&&(t=Object(a.rect)(1/0)),{kind:r.admittance,next:e,value:t,model:Object(o.d)([[a._1,a._0],[Object(a.div)(Object(a.rect)(-1),t),a._1]]),level:e.level}}(e.next,e.value);case r.xformer:return function(e,t){return void 0===e&&(e=s()),void 0===t&&(t=a._1),{kind:r.xformer,next:e,value:t,model:Object(o.d)([[Object(a.div)(a._1,t),a._0],[a._0,t]]),level:e.level}}(e.next,e.value);case r.line:return function(e,t){void 0===e&&(e=s());let n=void 0===t?{y:a._0,z:a._1}:t,c=n.y,i=n.z;return{kind:r.line,next:e,value:{y:c,z:i},model:Object(o.d)([[Object(a.cosh)(c),Object(a.mul)(Object(a.neg)(i),Object(a.sinh)(c))],[Object(a.div)(Object(a.sinh)(c),Object(a.neg)(i)),Object(a.cosh)(c)]]),level:e.level}}(e.next,e.value);case r.series:return u(e.next);case r.shunt:return function(e,t){return void 0===e&&(e=s()),void 0===t&&(t=u()),{kind:r.shunt,next:e,value:t,model:Object(o.d)([[a._1,a._0],[Object(a.div)(Object(o.e)(t.model)[1][0],Object(o.e)(t.model)[1][1]),a._1]],[a._0,Object(a.div)(Object(o.g)(t.model)[1],Object(o.e)(t.model)[1][1])]),level:e.level+t.level+1}}(e.next,e.value)}},v=e=>e,p=e=>m({kind:e}),h=e=>{if(e.kind===r.connector)throw new Error(`unexpected '${r.connector}'`);return e.next},f=(e,t)=>{if(e.kind===r.connector)throw new Error(`unexpected '${r.connector}'`);return m(v(Object.assign({},e,{next:t})))},b=e=>{if(e.kind!==r.shunt)throw new Error(`expected '${r.shunt}', got '${e.kind}'`);return e.value},k=(e,t)=>{if(e.kind!==r.shunt)throw new Error(`expected '${r.shunt}', got '${e.kind}'`);if(t.kind!==r.series)throw new Error(`expected '${r.series}', got '${t.kind}'`);return m(v(Object.assign({},e,{value:t})))},E=(e,t)=>{if(!Object(a.isPhasor)(t)||e.kind!==r.vsrc&&e.kind!==r.isrc&&e.kind!==r.impedance&&e.kind!==r.admittance&&e.kind!==r.xformer){if((e=>"object"==typeof e&&"y"in e&&Object(a.isPhasor)(e.y)&&"z"in e&&Object(a.isPhasor)(e.z))(t)&&e.kind===r.line)return m(v(Object.assign({},e,{value:t})));throw new Error(`cannot update element of kind '${e.kind}' with value '${t}'`)}return m(v(Object.assign({},e,{value:t})))},j=Object.keys(r).reduce((e,t,n)=>(e[e[t]=n]=t,e),{}),g=e=>{switch(e.kind){case r.connector:return[j[e.kind]];case r.ground:case r.series:return[j[e.kind],g(e.next)];case r.vsrc:case r.isrc:case r.impedance:case r.admittance:case r.xformer:return[j[e.kind],g(e.next),Object(a.pack)(e.value)];case r.line:{const t=e.value,n=t.y,r=t.z;return[j[e.kind],g(e.next),[Object(a.pack)(n),Object(a.pack)(r)]]}case r.shunt:return[j[e.kind],g(e.next),g(e.value)]}},O=e=>{if(!Array.isArray(e)||!e.length||e.length>3)throw new Error(`expected '[kind, next?, value?]', got ${e}`);const t=j[e[0]];if(!(e=>e in r)(t))throw new Error(`unknown element kind '${t}'`);switch(t){case r.connector:return s();case r.ground:case r.series:return f(p(t),O(e[1]));case r.vsrc:case r.isrc:case r.impedance:case r.admittance:case r.xformer:return E(f(p(t),O(e[1])),Object(a.unpack)(e[2]));case r.line:{if(!Array.isArray(e[2])||2!==e[2].length)throw new Error(`expected '[y, z]', got ${e}`);const n={y:Object(a.unpack)(e[2][0]),z:Object(a.unpack)(e[2][1])};return E(f(p(t),O(e[1])),n)}case r.shunt:return k(f(p(t),O(e[1])),O(e[2]))}}},Hglc:function(e,t){},Jvvb:function(e,t,n){"use strict";var r;n.d(t,"a",function(){return r}),n.d(t,"c",function(){return a}),n.d(t,"b",function(){return o}),n.d(t,"e",function(){return c}),n.d(t,"d",function(){return i}),n.d(t,"f",function(){return s}),function(e){e.hydrate="hydrate",e.activate="activate",e.remove="remove",e.insert="insert",e.update="update"}(r||(r={}));const a=e=>({type:r.hydrate,state:e}),o=e=>({type:r.activate,id:e}),c=e=>({type:r.remove,id:e}),i=e=>({type:r.insert,kind:e}),s=(e,t)=>({type:r.update,id:e,value:t})},"K/ws":function(e,t,n){"use strict";var r=n("q1tI"),a=n.n(r),o=n("/MKj"),c=n("D5DN"),i=n("5muy"),s=n("em/Y");t.a=Object(o.b)(e=>{return{entry:e.entry}})(e=>{let t=e.entry;return a.a.createElement("div",{className:"schematics",tabIndex:-1},a.a.createElement(s.a,{id:[],element:t,vi:[c._0,Object(i.f)(t.model)[1]]}))})},NijR:function(e,t,n){"use strict";n.d(t,"a",function(){return u});var r=n("q1tI"),a=n.n(r),o=n("o40e"),c=n("/1WU"),i=n("nsum"),s=n("uDhx"),l=n("aT25");const u=n("U94s");t.b=Object(o.a)(e=>{let t=e.vi,n=t[0],r=t[1],o=e.element,d=e.active,m=e.activate,v=e.remove,p=e.update;return a.a.createElement(i.a,{active:d,activate:m,remove:v,className:o.kind},a.a.createElement(u,null),a.a.createElement(s.a,{value:o.value,description:"series impedance",unit:l.b.ohm,onChange:p}),a.a.createElement(c.a,{value:n,unit:l.b.volt}),a.a.createElement(c.a,{value:r,unit:l.b.ampere}))})},NldC:function(e,t,n){"use strict";n.d(t,"a",function(){return r});const r=(e,t)=>{if(null==e)throw new Error(t);return e}},PU1u:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M962 2v3000M1703 2v3000"}))}a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},R0gK:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,[r.createElement("circle",{cx:"235",cy:"220",r:"40",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"20",key:0}),r.createElement("circle",{cx:"235",cy:"80",r:"40",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"20",key:1}),r.createElement("circle",{cx:"65",cy:"150",r:"40",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"20",key:2}),r.createElement("path",{stroke:"currentColor",strokeWidth:"40",d:"M198.01287 95.229986l-96.02574 39.540024m0 30.45998l96.02574 39.54002",key:3})])}a.defaultProps={viewBox:"0 0 300 300"},e.exports=a,a.default=a},SEQs:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"a",function(){return a});const r=function(e,t){void 0===t&&(t=3);const n=t-1-Math.min(Math.max(Math.floor(Math.log10(Math.abs(e))),0),t-1),r=(e<0?-1:1)*10**n;return(Math.floor(e*r)/r).toFixed(n)},a=e=>(e=e.trimLeft(),/^\-\.?(e|E)/.test(e)?-+`1${e.slice(1)}`:e.startsWith("-")?-+`0${e.slice(1)}`:/^\+\.?(e|E)/.test(e)?+`1${e.slice(1)}`:e.startsWith("+")?+`0${e.slice(1)}`:/^\.?(e|E)/.test(e)?+`1${e}`:e.startsWith(".")?+`0${e}`:+e)},Sj01:function(e,t,n){"use strict";n.d(t,"a",function(){return u});var r=n("q1tI"),a=n.n(r),o=n("o40e"),c=n("/1WU"),i=n("nsum"),s=n("uDhx"),l=n("aT25");const u=n("vT0r");t.b=Object(o.a)(e=>{let t=e.vi,n=t[0],r=t[1],o=e.element,d=e.active,m=e.activate,v=e.remove,p=e.update;return a.a.createElement(i.a,{active:d,activate:m,remove:v,className:o.kind},a.a.createElement(u,null),a.a.createElement(s.a,{value:o.value,description:"current",unit:l.b.ampere,onChange:p}),a.a.createElement(c.a,{value:n,unit:l.b.volt}),a.a.createElement(c.a,{value:r,unit:l.b.ampere}))})},U94s:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M0 667h1000M0 2333h3000M2000 667h1000m-1000 0v166H1000V500h1000v167z"}))}a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},"Vb/u":function(e,t,n){"use strict";var r=n("TSYQ"),a=n.n(r),o=n("q1tI"),c=n.n(o),i=n("SEQs"),s=n("D5DN"),l=n("aT25");const u=e=>{const t=Object(s.norm)(e);return t<l.a.femto?l.a.mono:t<l.a.pico?l.a.femto:t<l.a.nano?l.a.pico:t<l.a.micro?l.a.nano:t<l.a.milli?l.a.micro:t<l.a.mono?l.a.milli:t<l.a.kilo?l.a.mono:t<l.a.mega?l.a.kilo:t<l.a.giga?l.a.mega:t<l.a.tera?l.a.giga:t<l.a.peta?l.a.tera:t<l.a.exa?l.a.peta:l.a.mono};t.a=(e=>{let t=e.value,n=e.unit;return c.a.createElement("span",{className:"quantity"},c.a.createElement("span",{className:"mag"},(e=>{const t=Object(s.norm)(e);return t<l.a.femto?Object(i.b)(0):t<l.a.pico?Object(i.b)(t/l.a.femto):t<l.a.nano?Object(i.b)(t/l.a.pico):t<l.a.micro?Object(i.b)(t/l.a.nano):t<l.a.milli?Object(i.b)(t/l.a.micro):t<l.a.mono?Object(i.b)(t/l.a.milli):t<l.a.kilo?Object(i.b)(t/l.a.mono):t<l.a.mega?Object(i.b)(t/l.a.kilo):t<l.a.giga?Object(i.b)(t/l.a.mega):t<l.a.tera?Object(i.b)(t/l.a.giga):t<l.a.peta?Object(i.b)(t/l.a.tera):t<l.a.exa?Object(i.b)(t/l.a.peta):" ∞ "})(t)),c.a.createElement("span",{className:"ang"},(e=>Object(i.b)(Object(l.c)(Object(s.angle)(e))))(t)),c.a.createElement("span",{className:a()("prefix",l.a[u(t)])}),c.a.createElement("span",{className:a()("unit",n)}))})},YLfQ:function(e,t,n){"use strict";var r=n("TSYQ"),a=n.n(r),o=n("q1tI"),c=n.n(o),i=n("YogO");t.a=(e=>{let t=e.action,n=e.onFocus,r=e.onBlur,o=e.className,s=void 0===o?"":o,l=e.children;return c.a.createElement("span",{className:a()(s,{interactive:!!t}),onMouseDown:t&&Object(i.b)(t),onKeyDown:t&&Object(i.a)([" ","Enter"],Object(i.b)(t)),onFocus:t&&n,onBlur:t&&r,onMouseEnter:t&&n,onMouseLeave:t&&r,tabIndex:t?0:-1},l)})},YogO:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"a",function(){return a});const r=e=>t=>{t.stopPropagation(),e(t)},a=(e,t)=>n=>{e.includes(n.key)&&t(n)}},aT25:function(e,t,n){"use strict";var r,a;n.d(t,"b",function(){return r}),n.d(t,"a",function(){return a}),n.d(t,"d",function(){return c}),n.d(t,"c",function(){return i}),function(e){e.volt="volt",e.ampere="ampere",e.ohm="ohm",e.ratio="ratio"}(r||(r={})),function(e){e[e.femto=1e-15]="femto",e[e.pico=1e-12]="pico",e[e.nano=1e-9]="nano",e[e.micro=1e-6]="micro",e[e.milli=.001]="milli",e[e.mono=1]="mono",e[e.kilo=1e3]="kilo",e[e.mega=1e6]="mega",e[e.giga=1e9]="giga",e[e.tera=1e12]="tera",e[e.peta=1e15]="peta",e[e.exa=1e18]="exa"}(a||(a={}));const o=180/Math.PI,c=e=>e/o,i=e=>e*o},"em/Y":function(e,t,n){"use strict";var r=n("q1tI"),a=n.n(r),o=n("GDKA"),c=n("foLc"),i=n("hGe5"),s=n("nsum");const l=n("rRQx");var u=Object(i.a)(e=>{let t=e.element,n=e.active,r=e.activate;return a.a.createElement(s.a,{active:n,activate:r,className:t.kind},a.a.createElement(l,null))});const d=n("FrQ7");var m=e=>{let t=e.element;return a.a.createElement(s.a,{className:t.kind},a.a.createElement(d,null))},v=n("NijR"),p=n("Sj01"),h=n("5sdT"),f=n("5muy");const b=e=>{let t=e.next;return t?[t,...b(t)]:[]};var k=e=>{let t=e.element,n=e.id,r=e.vi;return a.a.createElement(s.a,{className:t.kind},b(t).map((e,t)=>{const o=a.a.createElement(O,{id:[...n,t+1],element:e,vi:r,key:t});return r=Object(f.c)(e.model,r),o}))},E=n("uim1"),j=n("+era"),g=n("BFWM"),O=t.a=(e=>{let t=e.id,n=e.element,r=e.vi;switch(n.kind){case o.a.ground:return a.a.createElement(m,{id:t,element:n,vi:r});case o.a.connector:return a.a.createElement(u,{id:t,element:n,vi:r});case o.a.vsrc:return a.a.createElement(j.b,{id:t,element:n,vi:r});case o.a.isrc:return a.a.createElement(p.b,{id:t,element:n,vi:r});case o.a.impedance:return a.a.createElement(v.b,{id:t,element:n,vi:r});case o.a.admittance:return a.a.createElement(c.b,{id:t,element:n,vi:r});case o.a.xformer:return a.a.createElement(g.b,{id:t,element:n,vi:r});case o.a.line:return a.a.createElement(h.b,{id:t,element:n,vi:r});case o.a.series:return a.a.createElement(k,{id:t,element:n,vi:r});case o.a.shunt:return a.a.createElement(E.b,{id:t,element:n,vi:r})}})},foLc:function(e,t,n){"use strict";n.d(t,"a",function(){return u});var r=n("q1tI"),a=n.n(r),o=n("o40e"),c=n("/1WU"),i=n("nsum"),s=n("uDhx"),l=n("aT25");const u=n("Ft0v");t.b=Object(o.a)(e=>{let t=e.vi,n=t[0],r=t[1],o=e.element,d=e.active,m=e.activate,v=e.remove,p=e.update;return a.a.createElement(i.a,{active:d,activate:m,remove:v,className:o.kind},a.a.createElement(u,null),a.a.createElement(s.a,{value:o.value,description:"shunt impedance",unit:l.b.ohm,onChange:p}),a.a.createElement(c.a,{value:n,unit:l.b.volt}),a.a.createElement(c.a,{value:r,unit:l.b.ampere}))})},g456:function(e,t,n){"use strict";var r=n("sxGJ"),a=n.n(r),o=n("q1tI"),c=n.n(o),i=n("i8i4"),s=n.n(i),l=n("/MKj"),u=n("NldC"),d=n("5G8z"),m=n("oxcE"),v=n("YLfQ");const p=n("R0gK");t.a=Object(l.b)(e=>({state:e}))(class extends c.a.PureComponent{constructor(e){super(e),this.share=Object(u.a)(document.getElementById("navbar"),"#navbar not found"),this.onClick=(()=>{this.setState({show:!0})}),this.onDismiss=(()=>{this.setState({show:!1})}),this.state={show:!1}}render(){const e=this.state.show?`${location.origin}${location.pathname}?${Object(d.c)(this.props.state)}`:"";return s.a.createPortal(c.a.createElement(v.a,{action:this.onClick,className:"share"},c.a.createElement(p,null),c.a.createElement(m.a,{show:this.state.show,title:"Share Link",onDismiss:this.onDismiss},c.a.createElement("div",{className:"input-group"},c.a.createElement("input",{id:"url",defaultValue:e,className:"form-control"}),c.a.createElement("div",{className:"input-group-append"},c.a.createElement("button",{ref:e=>e&&new a.a(e),"data-clipboard-target":"#url",className:"copy",type:"button"},"copy"))))),this.share)}})},hGe5:function(e,t,n){"use strict";var r=n("/MKj"),a=n("Jvvb"),o=n("okZy");const c=(e,t)=>{let n=e.active;return{active:Object(o.a)(t.id,n)}},i=(e,t)=>({activate:()=>{e(a.b(t.id))}});t.a=(e=>Object(r.b)(c,i)(e))},hrwi:function(e,t,n){"use strict";(function(e){var r=n("q1tI"),a=n.n(r),o=n("0cfB"),c=n("K/ws"),i=n("g456"),s=n("Atg9");t.a=Object(o.hot)(e)(()=>a.a.createElement(a.a.Fragment,null,a.a.createElement(i.a,null),a.a.createElement(s.a,null),a.a.createElement(c.a,null)))}).call(this,n("3UD+")(e))},kCCV:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,[r.createElement("path",{fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M27.901209 173.13417L58.559943 22.049669 161.03235 137.22734z",key:0}),r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M102.18194 1103.9503c82.72549-326.22932 82.38594-614.92907 0-948.73199",key:1})])}a.defaultProps={viewBox:"0 0 192 1126"},e.exports=a,a.default=a},kSts:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M556.12373 1000.5018A109.87627 499.49774 0 0 0 666 1499.9995a109.87627 499.49774 0 0 0 109.87627-499.4977A109.87627 499.49774 0 0 0 666 501.00403a109.87627 499.49774 0 0 0-109.87627 499.49777zM666 1499.9996l1667 .0006m0-999.0004H666M0 2334.0001h333V1334h333m1667 165.9954a109.87627 499.49774 0 0 0 95.1556-249.7489 109.87627 499.49774 0 0 0 0-499.49775A109.87627 499.49774 0 0 0 2333 500.99988M0 667h666m2333.9999 0h-585.2013m585.2013 1667.0001h-334V1334h-251.2022"}))}a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},nsum:function(e,t,n){"use strict";var r=n("TSYQ"),a=n.n(r),o=n("q1tI"),c=n.n(o),i=n("YLfQ");t.a=(e=>{let t=e.active,n=void 0!==t&&t,r=e.activate,o=e.remove,s=e.className,l=void 0===s?"":s,u=e.children;return c.a.createElement(i.a,{action:n?void 0:r,className:a()("tile",l,{active:n})},c.a.createElement(i.a,{action:o,className:"control remove fade"}),u)})},o40e:function(e,t,n){"use strict";var r=n("/MKj"),a=n("Jvvb"),o=n("EwVf");const c=(e,t)=>({update:n=>{e(a.f(t.id,n))}});t.a=(e=>Object(o.a)(Object(r.b)(null,c)(e)))},okZy:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"a",function(){return a});const r=(e,t)=>e.length<t.length&&e.every((e,n)=>e===t[n]),a=(e,t)=>e.length===t.length&&e.every((e,n)=>e===t[n])},oxcE:function(e,t,n){"use strict";var r=n("TSYQ"),a=n.n(r),o=n("q1tI"),c=n.n(o),i=n("i8i4"),s=n.n(i),l=n("YogO"),u=n("YLfQ");t.a=class extends c.a.PureComponent{constructor(){super(...arguments),this.portal=document.createElement("div"),this.footer=(()=>this.props.onConfirm?c.a.createElement("div",{className:"modal-footer"},c.a.createElement("button",{onMouseDown:this.props.onDismiss,type:"button",className:"btn btn-sm btn-secondary"},"Cancel"),c.a.createElement("button",{onMouseDown:this.props.onConfirm,type:"button",className:"btn btn-sm btn-primary"},"OK")):null),this.onEnter=Object(l.a)(["Enter"],()=>this.props.onConfirm&&this.props.onConfirm()),this.onEsc=Object(l.a)(["Escape"],()=>this.props.onDismiss())}componentWillMount(){document.body.appendChild(this.portal),this.componentWillReceiveProps(this.props)}componentWillUnmount(){this.componentWillReceiveProps({show:!1}),document.body.removeChild(this.portal)}componentWillReceiveProps(e){e.show?(document.addEventListener("keydown",this.onEnter),document.addEventListener("keydown",this.onEsc)):(document.removeEventListener("keydown",this.onEnter),document.removeEventListener("keydown",this.onEsc))}render(){const e=this.props,t=e.show,n=e.title,r=e.onDismiss;return s.a.createPortal(c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{onMouseDown:Object(l.b)(r),className:a()("modal",{show:t}),tabIndex:-1,role:"dialog","aria-labelledby":"title","aria-hidden":!t},c.a.createElement("div",{onMouseDown:Object(l.b)(()=>null),className:"modal-dialog",role:"document"},c.a.createElement("div",{className:"modal-content"},c.a.createElement("div",{className:"modal-header"},c.a.createElement("h5",{className:"modal-title",id:"title"},n),c.a.createElement(u.a,{action:r,className:"close"})),c.a.createElement("div",{className:"modal-body"},this.props.children),this.footer()))),c.a.createElement("div",{className:a()("modal-backdrop",{show:t})})),this.portal)}}},q4hS:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M342.00006 162.49999l139.9999-69.999982-139.9999-70zM23.000041 92.500008l319.000019-.5618"}))}a.defaultProps={viewBox:"0 0 505 185"},e.exports=a,a.default=a},rRQx:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,[r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M0 667l608-1M0 2333h608",key:0}),r.createElement("circle",{cx:"666",cy:"666",r:"60",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",key:1}),r.createElement("circle",{cx:"666",cy:"2333",r:"60",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",key:2})])}a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},"s/hM":function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M3002.4851 2334.0115H1835.4843v-333c-212.995-48.1035-212.995-279.0731.01-222 206.995 55.4641 206.995 166.4641 0 111-213.005-57.0745-213.005-390.0718-.01-333 207.005 55.4668 207.005 166.4668 0 111-212.995-57.0718-212.995-390.0745.01-333 206.995 55.4641 206.995 166.4668-.01 111-212.995-57.0718-212.995-383.8399.01-333 206.995 55.4641 206.995 171.7216 0 111-213.005-57.0745-213.005-280.07466-.01-223V668.01146l1167.0008-1M1568.4893 2000.0115v-1000M.00427339 2334H1167.005v-333c212.995-48.1035 212.995-279.0731-.01-222-206.995 55.4641-206.995 166.4641 0 111 213.005-57.0745 213.005-390.0718.01-333-207.005 55.4668-207.005 166.4668 0 111 212.995-57.0718 212.995-390.0745-.01-333-206.995 55.4641-206.995 166.4668.01 111 212.995-57.0718 212.995-383.8399-.01-333-206.995 55.4641-206.995 171.7216 0 111 213.005-57.0745 213.005-280.07462.01-223V668L.00427339 667M1434 2000V1000"}))}a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},sbQP:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,[r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M0 667h3000M0 2333h3000M666.4443 667.00005L1703 3000M666 2333l296 667",key:0}),r.createElement("circle",{cx:"666",cy:"666",r:"60",fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",key:1}),r.createElement("circle",{cx:"666",cy:"2333",r:"60",fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",key:2})])}a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},uDhx:function(e,t,n){"use strict";var r=n("TSYQ"),a=n.n(r),o=n("q1tI"),c=n.n(o),i=n("D5DN"),s=n("aT25"),l=n("oxcE"),u=n("YLfQ"),d=n("Vb/u"),m=n("SEQs");t.a=class extends c.a.PureComponent{constructor(e){super(e),this.onMag=(e=>{let t=e.target.value;isNaN(Object(m.a)(t))||this.setState({mag:t.trim()})}),this.onAng=(e=>{let t=e.target.value;isNaN(Object(m.a)(t))||this.setState({ang:t.trim()})}),this.onClick=(()=>{this.setState({prompt:!0})}),this.onDismiss=(()=>{this.setState((e,t)=>{let n=t.value;return{prompt:!1,mag:Object(i.norm)(n)+"",ang:Object(s.c)(Object(i.angle)(n))+""}})}),this.onConfirm=(()=>{this.setState({prompt:!1},()=>this.props.onChange(Object(i.polar)(Object(m.a)(this.state.mag),Object(s.d)(Object(m.a)(this.state.ang)))))}),this.state={prompt:!1,mag:Object(i.norm)(e.value)+"",ang:Object(s.c)(Object(i.angle)(e.value))+""}}componentWillReceiveProps(e){let t=e.value;this.setState({mag:Object(i.norm)(t)+"",ang:Object(s.c)(Object(i.angle)(t))+""})}render(){const e=this.props.unit&&c.a.createElement("div",{className:"input-group-append"},c.a.createElement("span",{className:"input-group-text"},c.a.createElement("span",{className:a()("unit",this.props.unit)})));return c.a.createElement(u.a,{action:this.onClick,className:a()("value control",this.props.name)},c.a.createElement(d.a,{value:this.props.value,unit:this.props.unit}),c.a.createElement(l.a,{show:this.state.prompt,title:this.props.description,onDismiss:this.onDismiss,onConfirm:this.onConfirm},c.a.createElement("div",{className:"form-row"},c.a.createElement("div",{className:"col input-group"},c.a.createElement("input",{value:this.state.mag,onChange:this.onMag,className:"form-control"}),e),c.a.createElement("div",{className:"col input-group"},c.a.createElement("div",{className:"input-group-prepend"},c.a.createElement("span",{className:"input-group-text"},c.a.createElement("span",{className:"symbol angle"}))),c.a.createElement("input",{value:this.state.ang,onChange:this.onAng,className:"form-control"}),c.a.createElement("div",{className:"input-group-append"},c.a.createElement("span",{className:"input-group-text"},c.a.createElement("span",{className:"unit degree"})))))))}}},uim1:function(e,t,n){"use strict";n.d(t,"a",function(){return p});var r=n("q1tI"),a=n.n(r),o=n("/MKj"),c=n("EwVf"),i=n("em/Y"),s=n("/1WU"),l=n("nsum"),u=n("okZy"),d=n("D5DN"),m=n("5muy"),v=n("aT25");const p=n("sbQP"),h=n("PU1u"),f=n("vGhS");t.b=Object(c.a)(Object(o.b)((e,t)=>{let n=e.active;return{essential:Object(u.b)(t.id,n)}})(e=>{let t=e.id,n=e.element,r=e.vi,o=e.active,c=e.activate,u=e.essential,b=e.remove;const k=Array(n.level-n.value.level-1).fill(0).map((e,t)=>a.a.createElement(h,{key:t}));return a.a.createElement(l.a,null,a.a.createElement(l.a,{activate:c,active:o,remove:u?void 0:b,className:n.kind},a.a.createElement(p,null),k,a.a.createElement(f,null),a.a.createElement(s.a,{value:r[0],unit:v.b.volt}),a.a.createElement(s.a,{value:r[1],unit:v.b.ampere})),a.a.createElement(i.a,{id:t,element:n.value,vi:[r[0],Object(d.sub)(r[1],Object(m.c)(n.model,r)[1])]}))}))},vGhS:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M1704 0l297 665 999 1M965 0l1035 2333h1000"}))}a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},vT0r:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,[r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M0 667h3000m-1500 499V667M0 2333h3000m-1500 0v-500m0-104l-.5618-319",key:0}),r.createElement("path",{fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M1570 1410l-70-140-70 140z",key:1}),r.createElement("circle",{cx:"1500",cy:"1500",r:"333",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",key:2})])}a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a}});