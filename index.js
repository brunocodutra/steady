!function(e){function t(t){for(var r,c,i=t[0],s=t[1],l=t[2],d=0,m=[];d<i.length;d++)c=i[d],a[c]&&m.push(a[c][0]),a[c]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(u&&u(t);m.length;)m.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var s=n[i];0!==a[s]&&(r=!1)}r&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={1:0},o=[];function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},c.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/steady/";var i=window.webpackJsonp=window.webpackJsonp||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var u=s;o.push([0,0]),n()}({"+era":function(e,t,n){"use strict";n.d(t,"a",function(){return l});var r=n("q1tI"),a=n("o40e"),o=n("/1WU"),c=n("nsum"),i=n("uDhx"),s=n("aT25");const l=n("7czd");t.b=Object(a.a)(({vi:[e,t],element:n,active:a,activate:u,remove:d,update:m})=>r.createElement(c.a,{active:a,activate:u,remove:d,className:n.kind},r.createElement(l,null),r.createElement(i.a,{value:n.value,description:"voltage",unit:s.b.volt,onChange:m}),r.createElement(o.a,{value:e,unit:s.b.volt}),r.createElement(o.a,{value:t,unit:s.b.ampere})))},"/1WU":function(e,t,n){"use strict";var r=n("TSYQ"),a=n("q1tI"),o=n("aT25"),c=n("YLfQ"),i=n("Vb/u");const s=n("kCCV"),l=n("q4hS"),u=({unit:e})=>{switch(e){case o.b.volt:return a.createElement(s,null);case o.b.ampere:return a.createElement(l,null)}};t.a=class extends a.PureComponent{constructor(e){super(e),this.onFocus=(()=>{this.setState({show:!0})}),this.onBlur=(()=>{this.setState({show:!1})}),this.state={show:!1}}render(){const e=this.state.show;return a.createElement(a.Fragment,null,a.createElement(c.a,{action:()=>null,onFocus:this.onFocus,onBlur:this.onBlur,className:r("status control fade",this.props.unit)},a.createElement(u,{unit:this.props.unit})),a.createElement("span",{className:r("status tooltip fade",{show:e})},a.createElement("span",{className:"arrow"}),a.createElement("span",{className:"tooltip-inner"},a.createElement(i.a,{value:this.props.value,unit:this.props.unit}))))}}},0:function(e,t,n){n("2YZa"),e.exports=n("Hglc")},"2YZa":function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),a=n("i8i4"),o=n("/MKj"),c=n("hrwi"),i=n("NldC"),s=(n("OG14"),n("ANjH")),l=n("Jvvb"),u=n("5G8z"),d=n("okZy"),m=n("GDKA");const v=(e,t,n)=>[...e.slice(0,t),e[t]+n,...e.slice(t+1)],p=(e,t,n)=>1===t.length&&0===t[0]?n(e):t.length>1&&0===t[0]?Object(m.g)(e,p(Object(m.b)(e),t.slice(1),n)):Object(m.e)(e,p(Object(m.j)(e),v(t,0,-1),n));var h=(e=Object(u.a)(),t)=>{const n=e.entry,r=e.active;switch(t.type){case l.a.activate:return{entry:n,active:t.id};case l.a.insert:return{entry:p(n,r,e=>Object(m.e)(Object(m.f)(t.kind),e)),active:v(r,r.length-1,1)};case l.a.remove:const a=t.id.slice(0,-1);return{entry:p(n,t.id,m.j),active:Object(d.b)(a,r)&&t.id[a.length]<r[a.length]?v(r,a.length,-1):r};case l.a.update:return{entry:p(n,t.id,e=>Object(m.l)(e,t.value)),active:r};default:return e}};var b=(e=Object(u.a)(),t)=>{switch(t.type){case l.a.hydrate:return t.state;default:return h(e,t)}};const f=[({getState:e})=>t=>n=>{const r=t(n);return[l.a.insert,l.a.remove,l.a.update].includes(n.type)&&history.pushState(Object(u.b)(e()),document.title,`${location.origin}${location.pathname}`),r}];const k=Object(u.e)(location.search.slice(1))||Object(u.a)(),E=s.c(b,k,s.a(...f));document.addEventListener("keypress",e=>{null===history.state||"z"!==e.key&&"Z"!==e.key||!e.ctrlKey||e.shiftKey||history.back()}),document.addEventListener("keypress",e=>{!e.ctrlKey||("z"!==e.key&&"Z"!==e.key||!e.shiftKey)&&("y"!==e.key&&"Y"!==e.key||e.shiftKey)||history.forward()}),history.replaceState(null,document.title,`${location.origin}${location.pathname}`),window.onpopstate=(({state:e})=>E.dispatch(Object(l.c)(null!==e?Object(u.d)(e):k)));var j=E;a.render(r.createElement(o.a,{store:j},r.createElement(c.a,null)),Object(i.a)(document.getElementById("steady"),"#steady not found"))},"5G8z":function(e,t,n){"use strict";n.d(t,"a",function(){return s}),n.d(t,"b",function(){return l}),n.d(t,"d",function(){return u}),n.d(t,"c",function(){return d}),n.d(t,"e",function(){return m});var r=n("+00W"),a=n.n(r),o=n("HlZf"),c=n("GDKA");const i=e=>Object(c.i)(Object(c.d)(e)),s=e=>{const t=i(e);return{entry:t,active:[Object(c.c)(t)]}},l=({entry:e,active:t})=>[Object(c.h)(e.next&&e.next.next),t],u=e=>{if(!Array.isArray(e)||2!==e.length||!Array.isArray(e[1])||!e[1].every(Number.isInteger))throw new Error(`expected '[entry, active]', got ${e}`);return{entry:i(Object(c.k)(e[0])),active:e[1]}},d=e=>a.a.encode(o.encode(l(e))),m=e=>{try{return u(o.decode(a.a.toBuffer(e)))}catch(e){return}}},"5muy":function(e,t,n){"use strict";n.d(t,"b",function(){return a}),n.d(t,"d",function(){return o}),n.d(t,"e",function(){return c}),n.d(t,"g",function(){return i}),n.d(t,"c",function(){return s}),n.d(t,"f",function(){return l}),n.d(t,"a",function(){return u});var r=n("D5DN");const a=[[r._1,r._0],[r._0,r._1]],o=(e=a,t=[r._0,r._0])=>({r:e,t:t}),c=({r:e})=>e,i=({t:e})=>e,s=({r:[[e,t],[n,a]],t:[o,c]},[i,s])=>[Object(r.add)(Object(r.add)(Object(r.mul)(e,i),Object(r.mul)(t,s)),o),Object(r.add)(Object(r.add)(Object(r.mul)(n,i),Object(r.mul)(a,s)),c)],l=({r:[[e,t],[n,a]],t:[o,c]},[i,s]=[r._0,r._0])=>{const l=Object(r.div)(Object(r.sub)(Object(r.sub)(s,c),Object(r.mul)(n,i)),a);return[Object(r.add)(Object(r.add)(Object(r.mul)(e,i),Object(r.mul)(t,l)),o),l]},u=(e,t)=>{const n=e.r,a=n[0],c=a[0],i=a[1],l=n[1],u=l[0],d=l[1],m=t.r,v=m[0],p=v[0],h=v[1],b=m[1],f=b[0],k=b[1];return o([[Object(r.add)(Object(r.mul)(p,c),Object(r.mul)(h,u)),Object(r.add)(Object(r.mul)(p,i),Object(r.mul)(h,d))],[Object(r.add)(Object(r.mul)(f,c),Object(r.mul)(k,u)),Object(r.add)(Object(r.mul)(f,i),Object(r.mul)(k,d))]],s(t,e.t))}},"5sdT":function(e,t,n){"use strict";n.d(t,"a",function(){return l});var r=n("q1tI"),a=n("o40e"),o=n("/1WU"),c=n("nsum"),i=n("uDhx"),s=n("aT25");const l=n("kSts");t.b=Object(a.a)(({vi:[e,t],element:n,active:a,activate:u,remove:d,update:m})=>r.createElement(c.a,{active:a,activate:u,remove:d,className:n.kind},r.createElement(l,null),r.createElement(i.a,{name:"y",value:n.value.y,description:"propagation constant",onChange:e=>m(Object.assign({},n.value,{y:e}))}),r.createElement(i.a,{name:"z",value:n.value.z,description:"characteristic impedance",unit:s.b.ohm,onChange:e=>m(Object.assign({},n.value,{z:e}))}),r.createElement(o.a,{value:e,unit:s.b.volt}),r.createElement(o.a,{value:t,unit:s.b.ampere})))},"7czd":function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,[r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M1277 666c223-333 223 333 446 0m149.2858-249.21516l167 .00002m-83.5 83.49998V333.28486M0 667l1166-1M0 2333h3000M1833 666l1167 1",key:0}),r.createElement("circle",{cx:"1500",cy:"666",r:"333",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",key:1})])}a.displayName="Vsrc",a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},Atg9:function(e,t,n){"use strict";var r=n("TSYQ"),a=n("q1tI"),o=n("i8i4"),c=n("YLfQ"),i=n("NldC"),s=n("/MKj"),l=n("Jvvb");var u=Object(s.b)(null,(e,t)=>({insert:()=>{e(l.d(t.kind))}}))(({kind:e,insert:t,children:n})=>a.createElement(c.a,{action:t,className:r("tool",e)},n)),d=n("GDKA"),m=n("foLc"),v=n("NijR"),p=n("Sj01"),h=n("5sdT"),b=n("uim1"),f=n("+era"),k=n("BFWM");t.a=class extends a.PureComponent{constructor(e){super(e),this.toggle=(()=>{this.setState(({open:e})=>({open:!e}))}),this.state={open:!0}}render(){const e=this.state.open;return a.createElement(a.Fragment,null,a.createElement(class extends a.PureComponent{constructor(){super(...arguments),this.toggler=Object(i.a)(document.getElementById("toggler"),"#toggler not found")}render(){return o.createPortal(a.createElement(c.a,{action:this.props.toggle,className:"toggler"}),this.toggler)}},{toggle:this.toggle}),a.createElement("div",{className:r("toolbox",{open:e})},a.createElement(u,{kind:d.a.vsrc},a.createElement(f.a,null)),a.createElement(u,{kind:d.a.isrc},a.createElement(p.a,null)),a.createElement(u,{kind:d.a.impedance},a.createElement(v.a,null)),a.createElement(u,{kind:d.a.admittance},a.createElement(m.a,null)),a.createElement(u,{kind:d.a.xformer},a.createElement(k.a,null)),a.createElement(u,{kind:d.a.line},a.createElement(h.a,null)),a.createElement(u,{kind:d.a.shunt},a.createElement(b.a,null))))}}},BFWM:function(e,t,n){"use strict";n.d(t,"a",function(){return l});var r=n("q1tI"),a=n("o40e"),o=n("/1WU"),c=n("nsum"),i=n("uDhx"),s=n("aT25");const l=n("s/hM");t.b=Object(a.a)(({vi:[e,t],element:n,active:a,activate:u,remove:d,update:m})=>r.createElement(c.a,{active:a,activate:u,remove:d,className:n.kind},r.createElement(l,null),r.createElement(i.a,{value:n.value,description:"transformer ratio",unit:s.b.ratio,onChange:m}),r.createElement(o.a,{value:e,unit:s.b.volt}),r.createElement(o.a,{value:t,unit:s.b.ampere})))},D5DN:function(e,t,n){"use strict";n.d(t,"_0",function(){return a}),n.d(t,"_1",function(){return o}),n.d(t,"pack",function(){return c}),n.d(t,"unpack",function(){return i});var r=n("/TNE");n.o(r,"add")&&n.d(t,"add",function(){return r.add}),n.o(r,"angle")&&n.d(t,"angle",function(){return r.angle}),n.o(r,"cosh")&&n.d(t,"cosh",function(){return r.cosh}),n.o(r,"div")&&n.d(t,"div",function(){return r.div}),n.o(r,"isPhasor")&&n.d(t,"isPhasor",function(){return r.isPhasor}),n.o(r,"mul")&&n.d(t,"mul",function(){return r.mul}),n.o(r,"neg")&&n.d(t,"neg",function(){return r.neg}),n.o(r,"norm")&&n.d(t,"norm",function(){return r.norm}),n.o(r,"polar")&&n.d(t,"polar",function(){return r.polar}),n.o(r,"rect")&&n.d(t,"rect",function(){return r.rect}),n.o(r,"sinh")&&n.d(t,"sinh",function(){return r.sinh}),n.o(r,"sub")&&n.d(t,"sub",function(){return r.sub});const a=Object(r.polar)(0),o=Object(r.polar)(1),c=e=>[e.mag,e.tan],i=e=>{if(!Array.isArray(e)||2!==e.length)throw new Error(`expected '[mag, tan]', got ${e}`);return{mag:+e[0],tan:+e[1]}}},EwVf:function(e,t,n){"use strict";var r=n("/MKj"),a=n("Jvvb"),o=n("hGe5");const c=(e,t)=>({remove:()=>{e(a.e(t.id))}});t.a=(e=>Object(o.a)(Object(r.b)(null,c)(e)))},FrQ7:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M1500 2666v-333m-334 333h667m-567 111h478m-412 111h334m1334-555H1500V666h1500"}))}a.displayName="Ground",a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},Ft0v:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M0 667h3000m-1500 333V667M0 2333h3000m-1500-333h-167V1000h333v1000h-166zm0 333v-333"}))}a.displayName="Admittance",a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},GDKA:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"d",function(){return l}),n.d(t,"i",function(){return u}),n.d(t,"c",function(){return d}),n.d(t,"f",function(){return p}),n.d(t,"j",function(){return h}),n.d(t,"e",function(){return b}),n.d(t,"b",function(){return f}),n.d(t,"g",function(){return k}),n.d(t,"l",function(){return E}),n.d(t,"h",function(){return g}),n.d(t,"k",function(){return O});n("rGqo");var r,a=n("D5DN"),o=n("5muy");!function(e){e.connector="connector",e.ground="ground",e.vsrc="vsrc",e.isrc="isrc",e.impedance="impedance",e.admittance="admittance",e.xformer="xformer",e.line="line",e.series="series",e.shunt="shunt"}(r||(r={}));const c=e=>e.kind!==r.connector?Object(o.a)(e.model,c(e.next)):e.model,i={kind:r.connector,next:void 0,value:void 0,model:Object(o.d)(),level:0},s=()=>i,l=(e=s())=>({kind:r.ground,next:e,value:void 0,model:Object(o.d)(),level:e.level}),u=(e=s())=>({kind:r.series,next:e,value:void 0,model:c(e),level:e.level}),d=e=>e.kind===r.connector?0:1+d(e.next),m=e=>{switch(e.kind){case r.connector:return s();case r.ground:return l(e.next);case r.vsrc:return((e=s(),t=a._0)=>({kind:r.vsrc,next:e,value:t,model:Object(o.d)(o.b,[t,a._0]),level:e.level}))(e.next,e.value);case r.isrc:return((e=s(),t=a._0)=>({kind:r.isrc,next:e,value:t,model:Object(o.d)(o.b,[a._0,t]),level:e.level}))(e.next,e.value);case r.impedance:return((e=s(),t=a._0)=>({kind:r.impedance,next:e,value:t,model:Object(o.d)([[a._1,Object(a.neg)(t)],[a._0,a._1]]),level:e.level}))(e.next,e.value);case r.admittance:return((e=s(),t=Object(a.rect)(1/0))=>({kind:r.admittance,next:e,value:t,model:Object(o.d)([[a._1,a._0],[Object(a.div)(Object(a.rect)(-1),t),a._1]]),level:e.level}))(e.next,e.value);case r.xformer:return((e=s(),t=a._1)=>({kind:r.xformer,next:e,value:t,model:Object(o.d)([[Object(a.div)(a._1,t),a._0],[a._0,t]]),level:e.level}))(e.next,e.value);case r.line:return((e=s(),{y:t,z:n}={y:a._0,z:a._1})=>({kind:r.line,next:e,value:{y:t,z:n},model:Object(o.d)([[Object(a.cosh)(t),Object(a.mul)(Object(a.neg)(n),Object(a.sinh)(t))],[Object(a.div)(Object(a.sinh)(t),Object(a.neg)(n)),Object(a.cosh)(t)]]),level:e.level}))(e.next,e.value);case r.series:return u(e.next);case r.shunt:return((e=s(),t=u())=>({kind:r.shunt,next:e,value:t,model:Object(o.d)([[a._1,a._0],[Object(a.div)(Object(o.e)(t.model)[1][0],Object(o.e)(t.model)[1][1]),a._1]],[a._0,Object(a.div)(Object(o.g)(t.model)[1],Object(o.e)(t.model)[1][1])]),level:e.level+t.level+1}))(e.next,e.value)}},v=e=>e,p=e=>m({kind:e}),h=e=>{if(e.kind===r.connector)throw new Error(`unexpected '${r.connector}'`);return e.next},b=(e,t)=>{if(e.kind===r.connector)throw new Error(`unexpected '${r.connector}'`);return m(v(Object.assign({},e,{next:t})))},f=e=>{if(e.kind!==r.shunt)throw new Error(`expected '${r.shunt}', got '${e.kind}'`);return e.value},k=(e,t)=>{if(e.kind!==r.shunt)throw new Error(`expected '${r.shunt}', got '${e.kind}'`);if(t.kind!==r.series)throw new Error(`expected '${r.series}', got '${t.kind}'`);return m(v(Object.assign({},e,{value:t})))},E=(e,t)=>{if(!Object(a.isPhasor)(t)||e.kind!==r.vsrc&&e.kind!==r.isrc&&e.kind!==r.impedance&&e.kind!==r.admittance&&e.kind!==r.xformer){if((e=>"object"==typeof e&&"y"in e&&Object(a.isPhasor)(e.y)&&"z"in e&&Object(a.isPhasor)(e.z))(t)&&e.kind===r.line)return m(v(Object.assign({},e,{value:t})));throw new Error(`cannot update element of kind '${e.kind}' with value '${t}'`)}return m(v(Object.assign({},e,{value:t})))},j=Object.keys(r).reduce((e,t,n)=>(e[e[t]=n]=t,e),{}),g=e=>{switch(e.kind){case r.connector:return[j[e.kind]];case r.ground:case r.series:return[j[e.kind],g(e.next)];case r.vsrc:case r.isrc:case r.impedance:case r.admittance:case r.xformer:return[j[e.kind],g(e.next),Object(a.pack)(e.value)];case r.line:{const t=e.value,n=t.y,r=t.z;return[j[e.kind],g(e.next),[Object(a.pack)(n),Object(a.pack)(r)]]}case r.shunt:return[j[e.kind],g(e.next),g(e.value)]}},O=e=>{if(!Array.isArray(e)||!e.length||e.length>3)throw new Error(`expected '[kind, next?, value?]', got ${e}`);const t=j[e[0]];if(!(e=>e in r)(t))throw new Error(`unknown element kind '${t}'`);switch(t){case r.connector:return s();case r.ground:case r.series:return b(p(t),O(e[1]));case r.vsrc:case r.isrc:case r.impedance:case r.admittance:case r.xformer:return E(b(p(t),O(e[1])),Object(a.unpack)(e[2]));case r.line:{if(!Array.isArray(e[2])||2!==e[2].length)throw new Error(`expected '[y, z]', got ${e}`);const n={y:Object(a.unpack)(e[2][0]),z:Object(a.unpack)(e[2][1])};return E(b(p(t),O(e[1])),n)}case r.shunt:return k(b(p(t),O(e[1])),O(e[2]))}}},Hglc:function(e,t){},Jvvb:function(e,t,n){"use strict";var r;n.d(t,"a",function(){return r}),n.d(t,"c",function(){return a}),n.d(t,"b",function(){return o}),n.d(t,"e",function(){return c}),n.d(t,"d",function(){return i}),n.d(t,"f",function(){return s}),function(e){e.hydrate="hydrate",e.activate="activate",e.remove="remove",e.insert="insert",e.update="update"}(r||(r={}));const a=e=>({type:r.hydrate,state:e}),o=e=>({type:r.activate,id:e}),c=e=>({type:r.remove,id:e}),i=e=>({type:r.insert,kind:e}),s=(e,t)=>({type:r.update,id:e,value:t})},"K/ws":function(e,t,n){"use strict";var r=n("q1tI"),a=n("/MKj"),o=n("D5DN"),c=n("5muy"),i=n("em/Y");t.a=Object(a.b)(({entry:e})=>({entry:e}))(({entry:e})=>r.createElement("div",{className:"schematics",tabIndex:-1},r.createElement(i.a,{id:[],element:e,vi:[o._0,Object(c.f)(e.model)[1]]})))},NijR:function(e,t,n){"use strict";n.d(t,"a",function(){return l});var r=n("q1tI"),a=n("o40e"),o=n("/1WU"),c=n("nsum"),i=n("uDhx"),s=n("aT25");const l=n("U94s");t.b=Object(a.a)(({vi:[e,t],element:n,active:a,activate:u,remove:d,update:m})=>r.createElement(c.a,{active:a,activate:u,remove:d,className:n.kind},r.createElement(l,null),r.createElement(i.a,{value:n.value,description:"series impedance",unit:s.b.ohm,onChange:m}),r.createElement(o.a,{value:e,unit:s.b.volt}),r.createElement(o.a,{value:t,unit:s.b.ampere})))},NldC:function(e,t,n){"use strict";n.d(t,"a",function(){return r});const r=(e,t)=>{if(null===e||void 0===e)throw new Error(t);return e}},PU1u:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M962 2v3000M1703 2v3000"}))}a.displayName="Wire",a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},R0gK:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,[r.createElement("circle",{cx:"235",cy:"220",r:"40",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"20",key:0}),r.createElement("circle",{cx:"235",cy:"80",r:"40",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"20",key:1}),r.createElement("circle",{cx:"65",cy:"150",r:"40",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"20",key:2}),r.createElement("path",{stroke:"currentColor",strokeWidth:"40",d:"M198.01287 95.229986l-96.02574 39.540024m0 30.45998l96.02574 39.54002",key:3})])}a.displayName="Share",a.defaultProps={viewBox:"0 0 300 300"},e.exports=a,a.default=a},SEQs:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"a",function(){return a});const r=(e,t=3)=>{const n=t-1-Math.min(Math.max(Math.floor(Math.log10(Math.abs(e))),0),t-1),r=(e<0?-1:1)*10**n;return(Math.floor(e*r)/r).toFixed(n)},a=e=>(e=e.trimLeft(),/^\-\.?(e|E)/.test(e)?-+`1${e.slice(1)}`:e.startsWith("-")?-+`0${e.slice(1)}`:/^\+\.?(e|E)/.test(e)?+`1${e.slice(1)}`:e.startsWith("+")?+`0${e.slice(1)}`:/^\.?(e|E)/.test(e)?+`1${e}`:e.startsWith(".")?+`0${e}`:+e)},Sj01:function(e,t,n){"use strict";n.d(t,"a",function(){return l});var r=n("q1tI"),a=n("o40e"),o=n("/1WU"),c=n("nsum"),i=n("uDhx"),s=n("aT25");const l=n("vT0r");t.b=Object(a.a)(({vi:[e,t],element:n,active:a,activate:u,remove:d,update:m})=>r.createElement(c.a,{active:a,activate:u,remove:d,className:n.kind},r.createElement(l,null),r.createElement(i.a,{value:n.value,description:"current",unit:s.b.ampere,onChange:m}),r.createElement(o.a,{value:e,unit:s.b.volt}),r.createElement(o.a,{value:t,unit:s.b.ampere})))},U94s:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M0 667h1000M0 2333h3000M2000 667h1000m-1000 0v166H1000V500h1000v167z"}))}a.displayName="Impedance",a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},"Vb/u":function(e,t,n){"use strict";var r=n("TSYQ"),a=n("q1tI"),o=n("SEQs"),c=n("D5DN"),i=n("aT25");t.a=(({value:e,unit:t})=>a.createElement("span",{className:"quantity"},a.createElement("span",{className:"mag"},(e=>{const t=Object(c.norm)(e);return t<i.a.femto?Object(o.b)(0):t<i.a.pico?Object(o.b)(t/i.a.femto):t<i.a.nano?Object(o.b)(t/i.a.pico):t<i.a.micro?Object(o.b)(t/i.a.nano):t<i.a.milli?Object(o.b)(t/i.a.micro):t<i.a.mono?Object(o.b)(t/i.a.milli):t<i.a.kilo?Object(o.b)(t/i.a.mono):t<i.a.mega?Object(o.b)(t/i.a.kilo):t<i.a.giga?Object(o.b)(t/i.a.mega):t<i.a.tera?Object(o.b)(t/i.a.giga):t<i.a.peta?Object(o.b)(t/i.a.tera):t<i.a.exa?Object(o.b)(t/i.a.peta):" ∞ "})(e)),a.createElement("span",{className:"ang"},(e=>Object(o.b)(Object(i.c)(Object(c.angle)(e))))(e)),a.createElement("span",{className:r("prefix",i.a[(e=>{const t=Object(c.norm)(e);return t<i.a.femto?i.a.mono:t<i.a.pico?i.a.femto:t<i.a.nano?i.a.pico:t<i.a.micro?i.a.nano:t<i.a.milli?i.a.micro:t<i.a.mono?i.a.milli:t<i.a.kilo?i.a.mono:t<i.a.mega?i.a.kilo:t<i.a.giga?i.a.mega:t<i.a.tera?i.a.giga:t<i.a.peta?i.a.tera:t<i.a.exa?i.a.peta:i.a.mono})(e)])}),a.createElement("span",{className:r("unit",t)})))},YLfQ:function(e,t,n){"use strict";var r=n("TSYQ"),a=n("q1tI"),o=n("YogO");t.a=(({action:e,onFocus:t,onBlur:n,className:c="",children:i})=>a.createElement("span",{className:r(c,{interactive:!!e}),onMouseDown:e&&Object(o.b)(e),onKeyDown:e&&Object(o.a)([" ","Enter"],Object(o.b)(e)),onFocus:e&&t,onBlur:e&&n,onMouseEnter:e&&t,onMouseLeave:e&&n,tabIndex:e?0:-1},i))},YogO:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"a",function(){return a});const r=e=>t=>{t.stopPropagation(),e(t)},a=(e,t)=>n=>{e.includes(n.key)&&t(n)}},aT25:function(e,t,n){"use strict";var r,a;n.d(t,"b",function(){return r}),n.d(t,"a",function(){return a}),n.d(t,"d",function(){return c}),n.d(t,"c",function(){return i}),function(e){e.volt="volt",e.ampere="ampere",e.ohm="ohm",e.ratio="ratio"}(r||(r={})),function(e){e[e.femto=1e-15]="femto",e[e.pico=1e-12]="pico",e[e.nano=1e-9]="nano",e[e.micro=1e-6]="micro",e[e.milli=.001]="milli",e[e.mono=1]="mono",e[e.kilo=1e3]="kilo",e[e.mega=1e6]="mega",e[e.giga=1e9]="giga",e[e.tera=1e12]="tera",e[e.peta=1e15]="peta",e[e.exa=1e18]="exa"}(a||(a={}));const o=180/Math.PI,c=e=>e/o,i=e=>e*o},"em/Y":function(e,t,n){"use strict";var r=n("q1tI"),a=n("GDKA"),o=n("foLc"),c=n("hGe5"),i=n("nsum");const s=n("rRQx");var l=Object(c.a)(({element:e,active:t,activate:n})=>r.createElement(i.a,{active:t,activate:n,className:e.kind},r.createElement(s,null)));const u=n("FrQ7");var d=({element:e})=>r.createElement(i.a,{className:e.kind},r.createElement(u,null)),m=n("NijR"),v=n("Sj01"),p=n("5sdT"),h=n("5muy");const b=({next:e})=>e?[e,...b(e)]:[];var f=({element:e,id:t,vi:n})=>r.createElement(i.a,{className:e.kind},b(e).map((e,a)=>{const o=r.createElement(g,{id:[...t,a+1],element:e,vi:n,key:a});return n=Object(h.c)(e.model,n),o})),k=n("uim1"),E=n("+era"),j=n("BFWM"),g=t.a=(({id:e,element:t,vi:n})=>{switch(t.kind){case a.a.ground:return r.createElement(d,{id:e,element:t,vi:n});case a.a.connector:return r.createElement(l,{id:e,element:t,vi:n});case a.a.vsrc:return r.createElement(E.b,{id:e,element:t,vi:n});case a.a.isrc:return r.createElement(v.b,{id:e,element:t,vi:n});case a.a.impedance:return r.createElement(m.b,{id:e,element:t,vi:n});case a.a.admittance:return r.createElement(o.b,{id:e,element:t,vi:n});case a.a.xformer:return r.createElement(j.b,{id:e,element:t,vi:n});case a.a.line:return r.createElement(p.b,{id:e,element:t,vi:n});case a.a.series:return r.createElement(f,{id:e,element:t,vi:n});case a.a.shunt:return r.createElement(k.b,{id:e,element:t,vi:n})}})},foLc:function(e,t,n){"use strict";n.d(t,"a",function(){return l});var r=n("q1tI"),a=n("o40e"),o=n("/1WU"),c=n("nsum"),i=n("uDhx"),s=n("aT25");const l=n("Ft0v");t.b=Object(a.a)(({vi:[e,t],element:n,active:a,activate:u,remove:d,update:m})=>r.createElement(c.a,{active:a,activate:u,remove:d,className:n.kind},r.createElement(l,null),r.createElement(i.a,{value:n.value,description:"shunt impedance",unit:s.b.ohm,onChange:m}),r.createElement(o.a,{value:e,unit:s.b.volt}),r.createElement(o.a,{value:t,unit:s.b.ampere})))},g456:function(e,t,n){"use strict";var r=n("sxGJ"),a=n("q1tI"),o=n("i8i4"),c=n("/MKj"),i=n("NldC"),s=n("5G8z"),l=n("oxcE"),u=n("YLfQ");const d=n("R0gK");t.a=Object(c.b)(e=>({state:e}))(class extends a.PureComponent{constructor(e){super(e),this.share=Object(i.a)(document.getElementById("navbar"),"#navbar not found"),this.onClick=(()=>{this.setState({show:!0})}),this.onDismiss=(()=>{this.setState({show:!1})}),this.state={show:!1}}render(){const e=this.state.show?`${location.origin}${location.pathname}?${Object(s.c)(this.props.state)}`:"";return o.createPortal(a.createElement(u.a,{action:this.onClick,className:"share"},a.createElement(d,null),a.createElement(l.a,{show:this.state.show,title:"Share Link",onDismiss:this.onDismiss},a.createElement("div",{className:"input-group"},a.createElement("input",{id:"url",value:e,className:"form-control"}),a.createElement("div",{className:"input-group-append"},a.createElement("button",{ref:e=>e&&new r(e),"data-clipboard-target":"#url",className:"copy",type:"button"},"copy"))))),this.share)}})},hGe5:function(e,t,n){"use strict";var r=n("/MKj"),a=n("Jvvb"),o=n("okZy");const c=({active:e},t)=>({active:Object(o.a)(t.id,e)}),i=(e,t)=>({activate:()=>{e(a.b(t.id))}});t.a=(e=>Object(r.b)(c,i)(e))},hrwi:function(e,t,n){"use strict";(function(e){var r=n("q1tI"),a=n("0cfB"),o=n("K/ws"),c=n("g456"),i=n("Atg9");t.a=Object(a.hot)(e)(()=>r.createElement(r.Fragment,null,r.createElement(c.a,null),r.createElement(i.a,null),r.createElement(o.a,null)))}).call(this,n("3UD+")(e))},kCCV:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,[r.createElement("path",{fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M27.901209 173.13417L58.559943 22.049669 161.03235 137.22734z",key:0}),r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M102.18194 1103.9503c82.72549-326.22932 82.38594-614.92907 0-948.73199",key:1})])}a.displayName="V",a.defaultProps={viewBox:"0 0 192 1126"},e.exports=a,a.default=a},kSts:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M556.12373 1000.5018A109.87627 499.49774 0 0 0 666 1499.9995a109.87627 499.49774 0 0 0 109.87627-499.4977A109.87627 499.49774 0 0 0 666 501.00403a109.87627 499.49774 0 0 0-109.87627 499.49777zM666 1499.9996l1667 .0006m0-999.0004H666M0 2334.0001h333V1334h333m1667 165.9954a109.87627 499.49774 0 0 0 95.1556-249.7489 109.87627 499.49774 0 0 0 0-499.49775A109.87627 499.49774 0 0 0 2333 500.99988M0 667h666m2333.9999 0h-585.2013m585.2013 1667.0001h-334V1334h-251.2022"}))}a.displayName="Line",a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},nsum:function(e,t,n){"use strict";var r=n("TSYQ"),a=n("q1tI"),o=n("YLfQ");t.a=(({active:e=!1,activate:t,remove:n,className:c="",children:i})=>a.createElement(o.a,{action:e?void 0:t,className:r("tile",c,{active:e})},a.createElement(o.a,{action:n,className:"control remove fade"}),i))},o40e:function(e,t,n){"use strict";var r=n("/MKj"),a=n("Jvvb"),o=n("EwVf");const c=(e,t)=>({update:n=>{e(a.f(t.id,n))}});t.a=(e=>Object(o.a)(Object(r.b)(null,c)(e)))},okZy:function(e,t,n){"use strict";n.d(t,"b",function(){return r}),n.d(t,"a",function(){return a});const r=(e,t)=>e.length<t.length&&e.every((e,n)=>e===t[n]),a=(e,t)=>e.length===t.length&&e.every((e,n)=>e===t[n])},oxcE:function(e,t,n){"use strict";var r=n("TSYQ"),a=n("q1tI"),o=n("i8i4"),c=n("YogO"),i=n("YLfQ");t.a=class extends a.PureComponent{constructor(){super(...arguments),this.portal=document.createElement("div"),this.footer=(()=>this.props.onConfirm?a.createElement("div",{className:"modal-footer"},a.createElement("button",{onMouseDown:this.props.onDismiss,type:"button",className:"btn btn-sm btn-secondary"},"Cancel"),a.createElement("button",{onMouseDown:this.props.onConfirm,type:"button",className:"btn btn-sm btn-primary"},"OK")):null),this.onEnter=Object(c.a)(["Enter"],()=>this.props.onConfirm&&this.props.onConfirm()),this.onEsc=Object(c.a)(["Escape"],()=>this.props.onDismiss())}componentWillMount(){document.body.appendChild(this.portal),this.componentWillReceiveProps(this.props)}componentWillUnmount(){this.componentWillReceiveProps({show:!1}),document.body.removeChild(this.portal)}componentWillReceiveProps({show:e}){e?(document.addEventListener("keydown",this.onEnter),document.addEventListener("keydown",this.onEsc)):(document.removeEventListener("keydown",this.onEnter),document.removeEventListener("keydown",this.onEsc))}render(){const e=this.props,t=e.show,n=e.title,s=e.onDismiss;return o.createPortal(a.createElement(a.Fragment,null,a.createElement("div",{onMouseDown:Object(c.b)(s),className:r("modal",{show:t}),tabIndex:-1,role:"dialog","aria-labelledby":"title","aria-hidden":!t},a.createElement("div",{onMouseDown:Object(c.b)(()=>null),className:"modal-dialog",role:"document"},a.createElement("div",{className:"modal-content"},a.createElement("div",{className:"modal-header"},a.createElement("h5",{className:"modal-title",id:"title"},n),a.createElement(i.a,{action:s,className:"close"})),a.createElement("div",{className:"modal-body"},this.props.children),this.footer()))),a.createElement("div",{className:r("modal-backdrop",{show:t})})),this.portal)}}},q4hS:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M342.00006 162.49999l139.9999-69.999982-139.9999-70zM23.000041 92.500008l319.000019-.5618"}))}a.displayName="I",a.defaultProps={viewBox:"0 0 505 185"},e.exports=a,a.default=a},rRQx:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,[r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M0 667l608-1M0 2333h608",key:0}),r.createElement("circle",{cx:"666",cy:"666",r:"60",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",key:1}),r.createElement("circle",{cx:"666",cy:"2333",r:"60",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",key:2})])}a.displayName="Connector",a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},"s/hM":function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M3002.4851 2334.0115H1835.4843v-333c-212.995-48.1035-212.995-279.0731.01-222 206.995 55.4641 206.995 166.4641 0 111-213.005-57.0745-213.005-390.0718-.01-333 207.005 55.4668 207.005 166.4668 0 111-212.995-57.0718-212.995-390.0745.01-333 206.995 55.4641 206.995 166.4668-.01 111-212.995-57.0718-212.995-383.8399.01-333 206.995 55.4641 206.995 171.7216 0 111-213.005-57.0745-213.005-280.07466-.01-223V668.01146l1167.0008-1M1568.4893 2000.0115v-1000M.00427339 2334H1167.005v-333c212.995-48.1035 212.995-279.0731-.01-222-206.995 55.4641-206.995 166.4641 0 111 213.005-57.0745 213.005-390.0718.01-333-207.005 55.4668-207.005 166.4668 0 111 212.995-57.0718 212.995-390.0745-.01-333-206.995 55.4641-206.995 166.4668.01 111 212.995-57.0718 212.995-383.8399-.01-333-206.995 55.4641-206.995 171.7216 0 111 213.005-57.0745 213.005-280.07462.01-223V668L.00427339 667M1434 2000V1000"}))}a.displayName="Xformer",a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},sbQP:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,[r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M0 667h3000M0 2333h3000M666.4443 667.00005L1703 3000M666 2333l296 667",key:0}),r.createElement("circle",{cx:"666",cy:"666",r:"60",fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",key:1}),r.createElement("circle",{cx:"666",cy:"2333",r:"60",fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",key:2})])}a.displayName="Shunt",a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},uDhx:function(e,t,n){"use strict";var r=n("TSYQ"),a=n("q1tI"),o=n("D5DN"),c=n("aT25"),i=n("oxcE"),s=n("YLfQ"),l=n("Vb/u"),u=n("SEQs");t.a=class extends a.PureComponent{constructor(e){super(e),this.onMag=(({target:{value:e}})=>{isNaN(Object(u.a)(e))||this.setState({mag:e.trim()})}),this.onAng=(({target:{value:e}})=>{isNaN(Object(u.a)(e))||this.setState({ang:e.trim()})}),this.onClick=(()=>{this.setState({prompt:!0})}),this.onDismiss=(()=>{this.setState((e,{value:t})=>({prompt:!1,mag:Object(o.norm)(t)+"",ang:Object(c.c)(Object(o.angle)(t))+""}))}),this.onConfirm=(()=>{this.setState({prompt:!1},()=>this.props.onChange(Object(o.polar)(Object(u.a)(this.state.mag),Object(c.d)(Object(u.a)(this.state.ang)))))}),this.state={prompt:!1,mag:Object(o.norm)(e.value)+"",ang:Object(c.c)(Object(o.angle)(e.value))+""}}componentWillReceiveProps({value:e}){this.setState({mag:Object(o.norm)(e)+"",ang:Object(c.c)(Object(o.angle)(e))+""})}render(){const e=this.props.unit&&a.createElement("div",{className:"input-group-append"},a.createElement("span",{className:"input-group-text"},a.createElement("span",{className:r("unit",this.props.unit)})));return a.createElement(s.a,{action:this.onClick,className:r("value control",this.props.name)},a.createElement(l.a,{value:this.props.value,unit:this.props.unit}),a.createElement(i.a,{show:this.state.prompt,title:this.props.description,onDismiss:this.onDismiss,onConfirm:this.onConfirm},a.createElement("div",{className:"form-row"},a.createElement("div",{className:"col input-group"},a.createElement("input",{value:this.state.mag,onChange:this.onMag,className:"form-control"}),e),a.createElement("div",{className:"col input-group"},a.createElement("div",{className:"input-group-prepend"},a.createElement("span",{className:"input-group-text"},a.createElement("span",{className:"symbol angle"}))),a.createElement("input",{value:this.state.ang,onChange:this.onAng,className:"form-control"}),a.createElement("div",{className:"input-group-append"},a.createElement("span",{className:"input-group-text"},a.createElement("span",{className:"unit degree"})))))))}}},uim1:function(e,t,n){"use strict";n.d(t,"a",function(){return v});var r=n("q1tI"),a=n("/MKj"),o=n("EwVf"),c=n("em/Y"),i=n("/1WU"),s=n("nsum"),l=n("okZy"),u=n("D5DN"),d=n("5muy"),m=n("aT25");const v=n("sbQP"),p=n("PU1u"),h=n("vGhS");t.b=Object(o.a)(Object(a.b)(({active:e},t)=>({essential:Object(l.b)(t.id,e)}))(({id:e,element:t,vi:n,active:a,activate:o,essential:l,remove:b})=>{const f=Array(t.level-t.value.level-1).fill(0).map((e,t)=>r.createElement(p,{key:t}));return r.createElement(s.a,null,r.createElement(s.a,{activate:o,active:a,remove:l?void 0:b,className:t.kind},r.createElement(v,null),f,r.createElement(h,null),r.createElement(i.a,{value:n[0],unit:m.b.volt}),r.createElement(i.a,{value:n[1],unit:m.b.ampere})),r.createElement(c.a,{id:e,element:t.value,vi:[n[0],Object(u.sub)(n[1],Object(d.c)(t.model,n)[1])]}))}))},vGhS:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M1704 0l297 665 999 1M965 0l1035 2333h1000"}))}a.displayName="Knee",a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a},vT0r:function(e,t,n){var r=n("q1tI");function a(e){return r.createElement("svg",e,[r.createElement("path",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M0 667h3000m-1500 499V667M0 2333h3000m-1500 0v-500m0-104l-.5618-319",key:0}),r.createElement("path",{fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",d:"M1570 1410l-70-140-70 140z",key:1}),r.createElement("circle",{cx:"1500",cy:"1500",r:"333",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"45",key:2})])}a.displayName="Isrc",a.defaultProps={viewBox:"0 0 3000 3000"},e.exports=a,a.default=a}});