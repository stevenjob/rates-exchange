(this["webpackJsonprates-exchange"]=this["webpackJsonprates-exchange"]||[]).push([[0],{61:function(n,e,t){n.exports=t(90)},66:function(n,e,t){},90:function(n,e,t){"use strict";t.r(e);var r=t(0),c=t.n(r),a=t(29),u=t.n(a),o=(t(66),t(10)),i=t(11);function l(){var n=Object(o.a)(["\n  border: #ccc solid 1px;\n  border-radius: 50%;\n  cursor: pointer;\n"]);return l=function(){return n},n}var s=i.a.div(l());var f=function(n){return r.createElement(s,{"data-testid":"switch-currencies",onClick:n.onClick},r.createElement("i",{className:"material-icons"},"swap_vert"))},m=t(5),b=function(n,e){return n.accountBalances[e]||0},v={},E=function(n,e){return function(n,e){return n.currencies[e]||v}(n,e).symbol||"?"},d=function(n){return Object.keys(n.currencies)},O=function(n){var e=n.exchange.currencyPair;return e?e.substring(3):""},h=function(n){var e=n.exchange.currencyPair;return e?e.substring(0,3):""},g=function(n){return n.exchange.currencyPair||""},p=function(n){return n.exchange.baseAmount},A=function(n){return n.exchange.contraAmount},C=function(n){return n.exchange.isBaseFixed},j=function(n){var e=p(n),t=h(n);return b(n,t)>=e},T=function(n){return j(n)&&0!==p(n)},_=function(n){var e=h(n);return E(n,e)},S=function(n){var e=O(n);return E(n,e)},y=function(n){return Boolean(n.exchange.shouldShowConfirmation)},N=function(n){return n.exchange.confirmationBaseAmount||0},x=function(n){return n.exchange.confirmationContraAmount||0},R=function(n,e){return n.rates[e]||0};function I(){var n=Object(o.a)(["\n  display: flex;\n  width: 140px;\n"]);return I=function(){return n},n}function B(){var n=Object(o.a)(["\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 2px;\n  display: flex;\n  justify-content: center;\n  pointer-events: none;\n"]);return B=function(){return n},n}var F=function(n){var e=g(n);return R(n,e)},w=i.a.div(B()),U=i.a.div(I());var k,D=function(){var n=Object(m.c)(F),e=Object(m.c)(S),t=Object(m.c)(_);return r.createElement(w,null,r.createElement(U,null,r.createElement("i",{className:"material-icons"},"trending_up"),r.createElement("span",{"data-testid":"exchange-rate"},"".concat(t,"1 = ").concat(e).concat(n))))},M=t(30),H=t.n(M),P=t(18),L=t(12),X="207ed1e745f142db823fbad0d021f129",Y=function(n){var e=n.substring(0,3),t=n.substring(3);return W(e,[t])},W=function(n){var e,t,r,c,a,u=arguments;return H.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return e=u.length>1&&void 0!==u[1]?u[1]:[],t=e.join(","),r="https://openexchangerates.org/api/latest.json?app_id=".concat(X,"&base=").concat(n),""!==t&&(r="".concat(r,"&symbols=").concat(t)),o.next=6,H.a.awrap(fetch(r));case 6:return c=o.sent,o.next=9,H.a.awrap(c.json());case 9:return a=o.sent,o.abrupt("return",Object.keys(a.rates).reduce((function(n,e){var t="".concat(a.base).concat(e);return Object(L.a)({},n,Object(P.a)({},t,a.rates[e]))}),{}));case 11:case"end":return o.stop()}}))},G={};!function(n){n.SET_RATES="SET_RATES"}(k||(k={}));var J,Z=function(n){return{type:k.SET_RATES,rates:n}};!function(n){n.SET_ACCOUNT_BALANCE="SET_ACCOUNT_BALANCE"}(J||(J={}));var q,z=function(n,e){return{type:"SET_ACCOUNT_BALANCE",currency:n,balance:e}},$=t(100);!function(n){n.SET_CURRENCY_PAIR="SET_CURRENCY_PAIR",n.SET_BASE_AMOUNT="SET_BASE_AMOUNT",n.SET_CONTRA_AMOUNT="SET_CONTRA_AMOUNT",n.SET_BASE_FIXED="SET_BASE_FIXED",n.SET_CONTRA_FIXED="SET_CONTRA_FIXED",n.SHOW_CONFIRMATION="SHOW_CONFIRMATION",n.HIDE_CONFIRMATION="HIDE_CONFIRMATION"}(q||(q={}));var K=function(n){return function(e,t){var r,c=t(),a=g(c);G[r=a]&&clearInterval(G[r]),function(n,e){Y(n).then(e);var t=setInterval((function(){Y(n).then(e)}),1e4);G[n]=t}(n,(function(n){return e(function(n){return function(e){e(Z(n)),e(Q())}}(n))})),e(function(n){return{type:q.SET_CURRENCY_PAIR,currencyPair:n}}(n))}},Q=function(){return function(n,e){var t=e();if(C(t)){var r=p(t),c=g(t),a=R(t,c),u=Number($.d($.c(r,a),2));n(tn(u))}else{var o=A(t),i=g(t),l=R(t,i);if(0===l)return void n(en(0));var s=Number($.d($.b(o,l),2));n(en(s))}}},V=function(n){return function(e){e(rn()),e(en(n)),e(Q())}},nn=function(n){return function(e){e(cn()),e(tn(n)),e(Q())}},en=function(n){return{type:q.SET_BASE_AMOUNT,amount:n}},tn=function(n){return{type:q.SET_CONTRA_AMOUNT,amount:n}},rn=function(){return{type:q.SET_BASE_FIXED}},cn=function(){return{type:q.SET_CONTRA_FIXED}},an=function(){return function(n,e){var t=e();if(T(t)){var r=p(t),c=h(t),a=A(t),u=O(t),o=Number($.d($.e(b(t,c),r),2)),i=Number($.d($.a(b(t,u),a),2));n(function(n,e){return{type:q.SHOW_CONFIRMATION,baseAmount:n,contraAmount:e}}(r,a)),n(z(c,o)),n(z(u,i)),n(en(0)),n(tn(0))}}},un=function(n){return n.toLocaleString("en-US",{minimumFractionDigits:2})};function on(){var n=Object(o.a)(["\n  cursor: pointer;\n  color: ",";\n"]);return on=function(){return n},n}var ln=(0,i.a.span)(on(),(function(n){return n.shouldHighlight?"red":"black"}));var sn=function(n){var e=n.shouldHighlight,t=n.symbol,c=n.balance,a=n.onClick;return r.createElement(ln,{shouldHighlight:e,"data-testid":"balance",onClick:a},"Balance: ",t,un(c))},fn=t(93),mn=t(52),bn=t.n(mn),vn=t(53),En=t.n(vn);function dn(){var n=Object(o.a)(["\n  text-align: right;\n"]);return dn=function(){return n},n}var On={prefix:"",suffix:"",includeThousandsSeparator:!0,thousandsSeparatorSymbol:",",allowDecimal:!0,decimalSymbol:".",decimalLimit:2,integerLimit:7,allowNegative:!1,allowLeadingZeroes:!1},hn=Object(i.a)((function(n){var e=function(n){var e=/\.([0-9]{1,2})/,t=En()(Object(L.a)({includeThousandsSeparator:!0,allowDecimal:!0,requireDecimal:!0,allowLeadingZeroes:!1},n));return function(n){var r=t(n),c=e.exec(n);return c&&c[1].length<2?r.push("0"):c||(r.push("0"),r.push("0")),r}}(Object(L.a)({},On));return r.createElement(bn.a,Object.assign({mask:e},n,{onChange:function(e){var t=Number(e.target.value.replace(/,/g,"").replace(/_/g,""));isNaN(t)||n.onChange(t)},render:function(n,e){return r.createElement(fn.a,Object.assign({"data-testid":"amount-input",innerRef:n},e))}}))}))(dn()),gn=t(58),pn=t(102),An=t(94),Cn=t(101),jn=t(95);function Tn(){var n=Object(o.a)(["\n  width: 70px;\n"]);return Tn=function(){return n},n}var _n=Object(i.a)(pn.a)(Tn());var Sn=function(n){var e=n.options,t=n.value,c=n.onChange,a=r.useState(!1),u=Object(gn.a)(a,2),o=u[0],i=u[1];return r.createElement(An.a,{isOpen:o,toggle:function(){return i((function(n){return!n}))},"data-testid":"currency-selector"},r.createElement(_n,{caret:!0,color:"primary"},t),r.createElement(Cn.a,null,r.createElement(jn.a,{header:!0},"Choose Source"),e.map((function(n,e){return r.createElement(jn.a,{key:e,onClick:function(){return c(n)}},n)}))))},yn=t(96),Nn=t(97),xn=t(98),Rn=t(103);function In(){var n=Object(o.a)(["\n  margin-bottom: 30px;\n"]);return In=function(){return n},n}var Bn=i.a.div(In());var Fn=function(n){var e=n.amount,t=n.selectedCurrency,c=n.shouldHighlightBalance,a=void 0!==c&&c,u=n.symbol,o=n.balance,i=n.currencies,l=n.onAmountChange,s=n.onAmountFocus,f=n.onCurrencySelected,m=n.onBalanceClick;return r.createElement(Bn,null,r.createElement(yn.a,null,r.createElement(Nn.a,null,r.createElement(xn.a,null,r.createElement(Rn.a,{addonType:"prepend"},r.createElement(Sn,{value:t,options:i,onChange:f})),r.createElement(hn,{value:e,onChange:l,onFocus:s})))),r.createElement(sn,{onClick:m,shouldHighlight:a,balance:o,symbol:u}))};var wn=function(){var n=Object(m.c)(d),e=Object(m.c)(p),t=Object(m.c)(h),c=!Object(m.c)(j),a=Object(m.c)(_),u=Object(m.c)((function(n){return b(n,t)})),o=Object(m.b)(),i={currencies:n,amount:e,selectedCurrency:t,shouldHighlightBalance:c,symbol:a,balance:u,onAmountChange:function(n){return o(V(n))},onAmountFocus:function(){return o(rn())},onCurrencySelected:function(n){return o((e=n,function(n,t){var r=t(),c=O(r);n(rn());var a=c;c===e&&(a=h(r)),n(K("".concat(e).concat(a))),n(Q())}));var e},onBalanceClick:function(){return o(V(u))}};return r.createElement(Fn,i)};var Un=function(){var n=Object(m.c)(d),e=Object(m.c)(A),t=Object(m.c)(O),c=Object(m.c)(S),a=Object(m.c)((function(n){return b(n,t)})),u=Object(m.b)(),o={currencies:n,amount:e,selectedCurrency:t,symbol:c,balance:a,onAmountChange:function(n){return u(nn(n))},onAmountFocus:function(){return u(cn())},onCurrencySelected:function(n){return u((e=n,function(n,t){var r=t(),c=h(r);n(cn());var a=c;c===e&&(a=O(r)),n(K("".concat(a).concat(e))),n(Q())}));var e},onBalanceClick:function(){return u(nn(a))}};return r.createElement(Fn,o)},kn=t(54);var Dn=function(){var n=Object(m.b)(),e=!Object(m.c)(T);return r.createElement(kn.a,{color:"primary",block:!0,onClick:function(){return n(an())},disabled:e,"data-testid":"exchange-button"},"Exchange")};function Mn(){var n=Object(o.a)(["\n  height: 30px;\n  position: relative;\n  padding: 2px;\n  margin-bottom: 30px;\n  margin-left: 15px;\n  margin-right: 15px;\n  display: flex;\n"]);return Mn=function(){return n},n}var Hn=i.a.div(Mn());var Pn=function(){var n=Object(m.b)();return r.createElement(r.Fragment,null,r.createElement(wn,null),r.createElement(Hn,null,r.createElement(f,{onClick:function(){return n((function(n,e){var t=e(),r=C(t),c=h(t),a=O(t),u="".concat(a).concat(c);if(n(K(u)),r){var o=p(t);n(nn(o))}else{var i=A(t);n(V(i))}}))}}),r.createElement(D,null)),r.createElement(Un,null),r.createElement(Dn,null))};function Ln(){var n=Object(o.a)(["\n  width: 50px;\n"]);return Ln=function(){return n},n}function Xn(){var n=Object(o.a)([""]);return Xn=function(){return n},n}function Yn(){var n=Object(o.a)(["\n  height: 244px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n"]);return Yn=function(){return n},n}var Wn=i.a.div(Yn()),Gn=i.a.div(Xn()),Jn=i.a.div(Ln());var Zn=function(){var n=Object(m.b)(),e=Object(m.c)(_),t=Object(m.c)(S),c=un(Object(m.c)(N)),a=un(Object(m.c)(x));return r.createElement(r.Fragment,null,r.createElement(Wn,null,r.createElement(Jn,null,r.createElement("i",{className:"material-icons",style:{fontSize:"50px"}},"check_circle")),r.createElement(Gn,{"data-testid":"confirmation-text"},"You exchanged ".concat(e).concat(c," to ").concat(t).concat(a))),r.createElement(kn.a,{color:"primary",block:!0,onClick:function(){return n({type:q.HIDE_CONFIRMATION})},"data-testid":"done-button"},"Done"))},qn=t(99);function zn(){var n=Object(o.a)(["\n  margin: auto;\n  max-width: 500px;\n"]);return zn=function(){return n},n}var $n=i.a.div(zn());var Kn=function(){var n=Object(m.c)(y);return r.createElement($n,null,r.createElement(qn.a,{fluid:"sm"},r.createElement("h3",null,"Exchange"),n?r.createElement(Zn,null):r.createElement(Pn,null)))},Qn=t(20),Vn={baseAmount:0,contraAmount:0,isBaseFixed:!0},ne=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Vn,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case q.SET_CURRENCY_PAIR:return Object(L.a)({},n,{currencyPair:e.currencyPair});case q.SET_BASE_AMOUNT:return Object(L.a)({},n,{baseAmount:e.amount});case q.SET_CONTRA_AMOUNT:return Object(L.a)({},n,{contraAmount:e.amount});case q.SET_BASE_FIXED:return Object(L.a)({},n,{isBaseFixed:!0});case q.SET_CONTRA_FIXED:return Object(L.a)({},n,{isBaseFixed:!1});case q.SHOW_CONFIRMATION:return Object(L.a)({},n,{shouldShowConfirmation:!0,confirmationBaseAmount:e.baseAmount,confirmationContraAmount:e.contraAmount});case q.HIDE_CONFIRMATION:return Object(L.a)({},n,{shouldShowConfirmation:!1,confirmationBaseAmount:null,confirmationContraAmount:null});default:return n}},ee=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1?arguments[1]:void 0;return e.type===k.SET_RATES?Object(L.a)({},n,{},e.rates):n},te=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1?arguments[1]:void 0;return e.type===J.SET_ACCOUNT_BALANCE?Object(L.a)({},n,Object(P.a)({},e.currency,e.balance)):n},re=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};arguments.length>1&&arguments[1];return n},ce=Object(Qn.c)({exchange:ne,rates:ee,accountBalances:te,currencies:re}),ae=t(57),ue=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=[ae.a],t=Object(Qn.e)(ce,n,Object(Qn.d)(Qn.a.apply(void 0,e),window.devToolsExtension?window.devToolsExtension():function(n){return n}));return t},oe=(t(88),t(89),ue({currencies:{USD:{symbol:"$"},GBP:{symbol:"\xa3"},EUR:{symbol:"\u20ac"}},accountBalances:{USD:1e3,EUR:1e3,GBP:1e3}}));oe.dispatch(K("USDEUR"));var ie=function(){return c.a.createElement(m.a,{store:oe},c.a.createElement("div",{className:"App"},c.a.createElement(Kn,null)))};u.a.render(c.a.createElement(ie,null),document.getElementById("root"))}},[[61,1,2]]]);
//# sourceMappingURL=main.d7368b13.chunk.js.map