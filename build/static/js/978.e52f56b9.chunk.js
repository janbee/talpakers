"use strict";(self.webpackChunkplay_ab_web=self.webpackChunkplay_ab_web||[]).push([[978],{6978:function(e,t,n){n.a(e,(async function(e,a){try{n.r(t),n.d(t,{UsersComponent:function(){return w}});var r=n(9439),l=n(2791),s=(n(2530),n(899)),i=n(2836),o=n(8900),c=n(5978),d=n(3656),u=n(7900),v=n(7689),p=n(1952),h=n(1418),g=n.n(h),m=n(1632),f=n(184),x=e([u]);u=(x.then?(await x)():x)[0];var w=(0,l.memo)((function(){var e,t,n,a=(0,d.h_)((function(){return u.b.getUsers()}),{withLoading:!1}),h=(0,r.Z)(a,1)[0],x=(0,l.useMemo)((function(){return[]}),[]),w=JSON.stringify(window.location.href),Z=(0,v.s0)(),b=(0,d.On)((function(e){x.length=0,e.checked=!0,x.push(e),Z("@".concat(e._id),{relative:"route",replace:w.includes("@")})}),[Z]),j=(0,l.useCallback)((function(e,t){e.stopPropagation();var n=JSON.parse(t.value),a=x.find((function(e){return e.build===n.build}));a?a.checked=t.checked:(n.checked=t.checked,x.push(n));var r=x.filter((function(e){return!0===e.checked})).map((function(e){return e._id})).join(",");Z(0===(null===r||void 0===r?void 0:r.length)?"":"@".concat(r),{relative:"route",replace:w.includes("@")})}),[x,w,Z]),k=null===(e=w.replaceAll('"',"").split("/").pop())||void 0===e?void 0:e.replace("@",""),y=(0,l.useCallback)((function(e,t){var n;e.preventDefault();var a=t["data-value"];console.log("gaga-------------------------------------",t,a),null===(n=h.reload)||void 0===n||n.call(h,a)}),[]);return(0,f.jsxs)("div",{className:g()({"users-wrap":!0}),children:[(0,f.jsxs)(s.Z,{inverted:!0,children:[(0,f.jsxs)("div",{className:"ttl",children:[(0,f.jsxs)("div",{children:[(0,f.jsx)("span",{children:"Users"}),!!x.length&&(0,f.jsxs)("span",{children:["(",x.filter((function(e){return e.checked})).length,")"]})]}),(0,f.jsx)(i.Z,{size:"small",className:"pointer",onClick:h.reload,name:"refresh"})]}),(0,f.jsx)("hr",{}),(0,f.jsx)("div",{className:"tbl-wrap",children:(0,f.jsxs)(o.Z,{celled:!0,striped:!0,selectable:!0,inverted:!0,compact:!0,children:[(0,f.jsx)(o.Z.Header,{children:(0,f.jsxs)(o.Z.Row,{children:[(0,f.jsx)(o.Z.HeaderCell,{className:"multi-select",textAlign:"center",children:"#"}),(0,f.jsx)(o.Z.HeaderCell,{children:"App"}),(0,f.jsx)(o.Z.HeaderCell,{textAlign:"center",className:"status",children:"Status"}),(0,f.jsx)(o.Z.HeaderCell,{children:"Version"}),(0,f.jsxs)(o.Z.HeaderCell,{className:"weekly-summary",textAlign:"center",children:["Weekly Summary",(0,f.jsx)("br",{}),"(Bonus + Earnings = Total)"]}),(0,f.jsx)(o.Z.HeaderCell,{className:"weekly-progress",textAlign:"center",children:"Weekly Progress"}),(0,f.jsx)(o.Z.HeaderCell,{textAlign:"center",className:"bets",children:"Bets"}),(0,f.jsx)(o.Z.HeaderCell,{className:"last-update",textAlign:"right",children:"Active"})]})}),(0,f.jsx)(o.Z.Body,{children:null===(t=h.data)||void 0===t?void 0:t.map((function(e){var t,n=x.find((function(t){return t.build===e.build})),a=x.filter((function(e){return e.checked})).map((function(e){return e.build})),r=(null===k||void 0===k?void 0:k.split(","))||[];return(0,f.jsxs)(o.Z.Row,{className:g()({selected:a.includes(e.build)||r.includes(e._id)}),onClick:b(e),children:[(0,f.jsx)(o.Z.Cell,{selectable:!0,className:"multi-select",textAlign:"center",children:(0,f.jsx)(c.Z,{value:JSON.stringify(e),checked:!(null===n||void 0===n||!n.checked),onChange:j})}),(0,f.jsx)(o.Z.Cell,{collapsing:!0,children:(0,f.jsx)(m.Sn,{user:e})}),(0,f.jsx)(o.Z.Cell,{collapsing:!0,textAlign:"center",className:"status",children:(0,f.jsx)(m.gc,{loading:h.loading,user:e})}),(0,f.jsx)(o.Z.Cell,{collapsing:!0,children:null===(t=e.data)||void 0===t?void 0:t.version}),(0,f.jsx)(o.Z.Cell,{textAlign:"center",className:"week-summary",children:(0,f.jsx)(m.NA,{user:e})}),(0,f.jsx)(o.Z.Cell,{textAlign:"right",className:"progress",children:(0,f.jsx)(m.aY,{user:e})}),(0,f.jsx)(o.Z.Cell,{textAlign:"center",className:"bets",children:(0,f.jsx)(m.C4,{user:e})}),(0,f.jsx)(o.Z.Cell,{textAlign:"right",className:"last-login",children:(0,f.jsx)(m.BQ,{user:e})})]},e._id)}))}),(0,f.jsx)(o.Z.Footer,{children:(0,f.jsx)(o.Z.Row,{children:(0,f.jsx)(o.Z.HeaderCell,{colSpan:"100",children:(0,f.jsxs)("div",{className:"footer-wrap",children:[(0,f.jsxs)("span",{children:["Total Users ",null===(n=h.data)||void 0===n?void 0:n.length]}),(0,f.jsx)(m.Wx,{users:h.data,onClick:y})]})})})})]})}),(0,f.jsx)(p.o,{loading:h.loading})]}),(0,f.jsx)(v.j3,{})]})}));a()}catch(Z){a(Z)}}))},1632:function(e,t,n){n.d(t,{C4:function(){return H},Sn:function(){return E},BQ:function(){return R},aY:function(){return T},gc:function(){return D},Wx:function(){return M},NA:function(){return W}});var a=n(4599),r=n(7462),l=n(4578),s=n(5183),i=n(5295),o=n(344),c=n(8686),d=s.Z.isFinite,u=Math.min;var v=function(e){var t=Math[e];return function(e,n){if(e=(0,o.Z)(e),(n=null==n?0:u((0,i.Z)(n),292))&&d(e)){var a=((0,c.Z)(e)+"e").split("e"),r=t(a[0]+"e"+(+a[1]+n));return+((a=((0,c.Z)(r)+"e").split("e"))[0]+"e"+(+a[1]-n))}return t(e)}}("round");var p=function(e,t,n){return e===e&&(void 0!==n&&(e=e<=n?e:n),void 0!==t&&(e=e>=t?e:t)),e};var h=function(e,t,n){return void 0===n&&(n=t,t=void 0),void 0!==n&&(n=(n=(0,o.Z)(n))===n?n:0),void 0!==t&&(t=(t=(0,o.Z)(t))===t?t:0),p((0,o.Z)(e),t,n)},g=n(2790),m=n(8182),f=n(2791),x=n(5831),w=n(570),Z=n(7826),b=n(6755),j=n(6246),k=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).calculatePercent=function(){var e=t.props,n=e.percent,a=e.total,r=e.value;return(0,g.Z)(n)?(0,g.Z)(a)||(0,g.Z)(r)?void 0:r/a*100:n},t.computeValueText=function(e){var n=t.props,a=n.progress,r=n.total,l=n.value;return"value"===a?l:"ratio"===a?l+"/"+r:e+"%"},t.getPercent=function(){var e=t.props,n=e.precision,a=e.progress,r=e.total,l=e.value,s=h(t.calculatePercent(),0,100);return(0,g.Z)(r)||(0,g.Z)(l)||"value"!==a?"value"===a?l:(0,g.Z)(n)?s:v(s,n):l/r*100},t.isAutoSuccess=function(){var e=t.props,n=e.autoSuccess,a=e.percent,r=e.total,l=e.value;return n&&(a>=100||l>=r)},t.renderLabel=function(){var e=t.props,n=e.children,a=e.content,r=e.label;return x.kK(n)?x.kK(a)?(0,w.DE)(r,{autoGenerateKey:!1,defaultProps:{className:"label"}}):f.createElement("div",{className:"label"},a):f.createElement("div",{className:"label"},n)},t.renderProgress=function(e){var n=t.props,a=n.precision;if(n.progress||!(0,g.Z)(a))return f.createElement("div",{className:"progress"},t.computeValueText(e))},t}return(0,l.Z)(t,e),t.prototype.render=function(){var e=this.props,n=e.active,a=e.attached,l=e.className,s=e.color,i=e.disabled,o=e.error,c=e.indicating,d=e.inverted,u=e.size,v=e.success,p=e.warning,h=(0,m.Z)("ui",s,u,(0,Z.lG)(n||c,"active"),(0,Z.lG)(i,"disabled"),(0,Z.lG)(o,"error"),(0,Z.lG)(c,"indicating"),(0,Z.lG)(d,"inverted"),(0,Z.lG)(v||this.isAutoSuccess(),"success"),(0,Z.lG)(p,"warning"),(0,Z.cD)(a,"attached"),"progress",l),g=(0,b.Z)(t,this.props),x=(0,j.Z)(t,this.props),w=this.getPercent()||0;return f.createElement(x,(0,r.Z)({},g,{className:h,"data-percent":Math.floor(w)}),f.createElement("div",{className:"bar",style:{width:w+"%"}},this.renderProgress(w)),this.renderLabel())},t}(f.Component);k.handledProps=["active","as","attached","autoSuccess","children","className","color","content","disabled","error","indicating","inverted","label","percent","precision","progress","size","success","total","value","warning"],k.propTypes={};var y=k,S=n(834),N=n(1418),A=n.n(N),P=n(3656),C=n(2426),G=n.n(C),B=n(763),I=n(184),E=function(e){var t,n,r,l,s,i,o=e.user,c=(0,P.Sn)().weekStart.toISOString()!==(null===(t=o.data)||void 0===t||null===(n=t.weekStatus)||void 0===n?void 0:n.startDate);return(0,I.jsxs)(I.Fragment,{children:[!(null===(r=o.data.weekStatus)||void 0===r||!r.withdrawal)&&!c&&(0,I.jsx)(I.Fragment,{children:[{Pending:"Pending"===(null===(l=o.data.weekStatus)||void 0===l?void 0:l.withdrawal.TransactionStatus),Approved:"Approved"===(null===(s=o.data.weekStatus)||void 0===s?void 0:s.withdrawal.TransactionStatus),Processing:["In Process","Sending to Processor"].includes(null===(i=o.data.weekStatus)||void 0===i?void 0:i.withdrawal.TransactionStatus)}].map((function(e,t){var n,r,l,s,i,c;return(0,I.jsxs)(a.Z,{position:"right center",trigger:(0,I.jsx)("div",{className:A()({"has-withdrawal":!0,yellow:e.Pending,green:e.Approved,blue:e.Processing})}),flowing:!0,children:[(0,I.jsxs)(a.Z.Header,{children:["Withdrawal (",(0,I.jsx)("span",{className:A()({"yellow-light":e.Pending,"green-light":e.Approved,"blue-light":e.Processing}),children:null===(n=o.data.weekStatus)||void 0===n||null===(r=n.withdrawal)||void 0===r?void 0:r.TransactionStatus}),")"]}),(0,I.jsx)(a.Z.Content,{children:"".concat(null===(l=o.data.weekStatus)||void 0===l||null===(s=l.withdrawal)||void 0===s?void 0:s.PaymentMethodInfo," ").concat((0,P.WI)((null===(i=o.data.weekStatus)||void 0===i||null===(c=i.withdrawal)||void 0===c?void 0:c.Amount)||0))})]},t)}))}),(0,I.jsx)("span",{children:o.build})]})},D=function(e){var t=e.loading,n=e.user,r=(0,P.hL)(n);return(0,I.jsx)(I.Fragment,{children:!t&&[r].map((function(e,t){var n="green-light",r=(0,I.jsx)("i",{className:"fa-solid fa-circle-check fa-beat",style:{color:"var(--green-dark)","--fa-animation-duration":"10s"}},t);return e===P.J0.InProgress?(n="yellow-light",r=(0,I.jsx)("i",{className:"fa-solid fa-basketball fa-beat",style:{color:"var(--yellow-dark)","--fa-animation-duration":"2s"}},t)):e===P.J0.IsWaiting&&(n="red-light",r=(0,I.jsx)("i",{className:"fa-solid fa-circle-stop fa-beat",style:{color:"var(--red-dark)","--fa-animation-duration":"5s"}},t)),(0,I.jsx)(a.Z,{position:"top center",trigger:r,content:function(){return(0,I.jsx)("span",{className:n,children:e})},mouseEnterDelay:1500,mouseLeaveDelay:500},t)}))})},W=function(e){var t,n,a,r,l,s,i,o,c,d,u,v=e.user,p=(0,P.Sn)().weekStart.toISOString()!==(null===(t=v.data)||void 0===t||null===(n=t.weekStatus)||void 0===n?void 0:n.startDate),h=(null===(a=v.data)||void 0===a||null===(r=a.weekStatus)||void 0===r||null===(l=r.betSummary)||void 0===l?void 0:l.betSummary.totalEarnings)||0,g=(null===(s=v.data)||void 0===s||null===(i=s.weekStatus)||void 0===i||null===(o=i.betSummary)||void 0===o?void 0:o.betSummary.bonus)||0,m=(null===(c=v.data)||void 0===c||null===(d=c.weekStatus)||void 0===d||null===(u=d.betSummary)||void 0===u?void 0:u.betSummary.winnings)||0;return p&&(h=0,g=0,m=0),(0,I.jsx)(I.Fragment,{children:(0,I.jsxs)("div",{className:"week-summary-wrap",children:[(0,I.jsx)("span",{className:A()({win:g>0,lose:g<0}),children:(0,P.WI)(g)})," + ",(0,I.jsx)("span",{className:A()({win:h>0,lose:h<0}),children:(0,P.WI)(h)})," = ",(0,I.jsx)("span",{className:A()({win:m>0,lose:m<0}),children:(0,P.WI)(m)})]})})},T=function(e){var t,n,a,r,l,s,i,o=e.user,c=(0,P.Sn)().weekStart.toISOString()!==(null===(t=o.data)||void 0===t||null===(n=t.weekStatus)||void 0===n?void 0:n.startDate),d=(null===(a=o.data)||void 0===a||null===(r=a.weekStatus)||void 0===r||null===(l=r.betSummary)||void 0===l?void 0:l.betSummary.totalStaked)||0;return c&&(d=0),(0,I.jsx)(I.Fragment,{children:(0,I.jsx)(y,{indicating:!0,inverted:!0,success:!0===(null===(s=o.data)||void 0===s||null===(i=s.weekStatus)||void 0===i?void 0:i.done)&&0!==d,precision:0,value:Math.floor(d),progress:"percent",total:380,label:(0,P.WI)(d)})})},H=function(e){var t,n,a,r,l=e.user,s={open:(null===(t=l.data.weekStatus)||void 0===t||null===(n=t.betSummary)||void 0===n?void 0:n.betSummary.openBets)||0,settled:(null===(a=l.data.weekStatus)||void 0===a||null===(r=a.betSummary)||void 0===r?void 0:r.betSummary.settledBets)||0};return(0,I.jsx)(I.Fragment,{children:[s].map((function(e,t){var n=e.open,a=e.settled;return(0,I.jsxs)("div",{children:[(0,I.jsx)("span",{children:n}),(0,I.jsx)("span",{children:"-"}),(0,I.jsx)("span",{children:a})]},t)}))})},M=function(e){var t=e.users,n=e.onClick,a=(0,f.useMemo)((function(){var e=(0,P.Sn)().weekStart;return{isDone:function(t){var n,a,r,l,s=e.toISOString()===(null===(n=t.data)||void 0===n||null===(a=n.weekStatus)||void 0===a?void 0:a.startDate);return!0===(null===(r=t.data)||void 0===r||null===(l=r.weekStatus)||void 0===l?void 0:l.done)&&s},isInProgress:function(e){var t,n,a=!1===(null===(t=e.data)||void 0===t||null===(n=t.weekStatus)||void 0===n?void 0:n.done),r=G()(e.updatedAt||e.createdAt),l=G().duration(r.diff(Date.now())),s=Math.abs(l.asMinutes());return a&&s<30},isWaiting:function(e){var t=G()(e.updatedAt||e.createdAt),n=G().duration(t.diff(Date.now()));return Math.abs(n.asMinutes())>30},orderByIsDone:function(e){return(0,B.orderBy)(e,[function(e){return(0,P.hL)(e)===P.J0.IsDone},"updatedAt"],["desc","desc"])},orderByIsInProgress:function(e){return(0,B.orderBy)(e,[function(e){return(0,P.hL)(e)===P.J0.InProgress},"data.weekStatus.betSummary.betSummary.totalStaked"],["desc","desc"])},orderByIsWaiting:function(e){return(0,B.orderBy)(e,[function(e){return(0,P.hL)(e)===P.J0.IsWaiting},"updatedAt"],["desc","desc"])}}}),[]),r=(0,f.useMemo)((function(){var e={done:0,inProgress:0,waiting:0};return null===t||void 0===t||t.forEach((function(t){a.isDone(t)?e.done++:a.isInProgress(t)?e.inProgress++:a.isWaiting(t)&&e.waiting++})),e}),[t]);return(0,I.jsxs)("div",{className:"filter-wrap",children:[(0,I.jsxs)(S.Z,{compact:!0,style:{background:"var(--green-dark)"},size:"small",onClick:n,"data-value":{orderBy:a.orderByIsDone},children:["Done ",!!r.done&&"#".concat(r.done)]}),(0,I.jsxs)(S.Z,{compact:!0,style:{background:"var(--yellow-dark)"},size:"small",onClick:n,"data-value":{orderBy:a.orderByIsInProgress},children:["InProgress ",!!r.inProgress&&"#".concat(r.inProgress)]}),(0,I.jsxs)(S.Z,{compact:!0,style:{background:"var(--red-dark)"},size:"small",onClick:n,"data-value":{orderBy:a.orderByIsWaiting},children:["Waiting ",!!r.waiting&&"#".concat(r.waiting)]})]})},R=function(e){var t,n=e.user,r=G()(n.updatedAt||n.createdAt),l=G().duration(r.diff(Date.now())),s=Math.abs(l.asMinutes()),i=s>30?(0,P.Bb)(29):(0,P.Bb)(Math.floor(s)),o=!0===(null===(t=n.data.weekStatus)||void 0===t?void 0:t.hasBetRestriction);return console.log("gaga------------------------hasBetRestriction-------------",o),(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(a.Z,{position:"left center",trigger:(0,I.jsx)("div",{className:A()({"has-bet-restriction":o})}),flowing:!0,children:(0,I.jsx)(a.Z.Header,{children:(0,I.jsx)("span",{className:A()({"red-light":!0}),children:"Bet Restricted (T_T) !!!"})})}),(0,I.jsx)("span",{style:{color:i},children:r.fromNow()})]})}},1952:function(e,t,n){n.d(t,{o:function(){return v}});var a=n(1413),r=n(9439),l=n(3144),s=n(5671),i=n(2791),o=n(1487),c=n(2417),d=n(184),u=(0,l.Z)((function e(t){(0,s.Z)(this,e),this.loading=!1,this.content="",this.loading=t.loading,this.content=t.content})),v=function(e){var t=(0,i.useState)(new u(e)),n=(0,r.Z)(t,2),l=n[0],s=n[1];return(0,i.useEffect)((function(){s((function(t){return(0,a.Z)((0,a.Z)({},t),{},{loading:e.loading})}))}),[e.loading]),(0,d.jsx)(o.Z,(0,a.Z)((0,a.Z)({style:{position:"absolute",top:0,left:0,right:0,bottom:0}},l.loading?{active:!0}:{}),{},{children:(0,d.jsx)(c.Z,{})}))}},8900:function(e,t,n){n.d(t,{Z:function(){return N}});var a=n(7462),r=n(4210),l=n(8182),s=n(2791),i=n(7826),o=n(6755),c=n(6246),d=n(5831);function u(e){var t=e.children,n=e.className,r=(0,l.Z)(n),i=(0,o.Z)(u,e),d=(0,c.Z)(u,e);return s.createElement(d,(0,a.Z)({},i,{className:r}),t)}u.handledProps=["as","children","className"],u.defaultProps={as:"tbody"},u.propTypes={};var v=u,p=n(570),h=n(2836);function g(e){var t=e.active,n=e.children,r=e.className,u=e.collapsing,v=e.content,p=e.disabled,m=e.error,f=e.icon,x=e.negative,w=e.positive,Z=e.selectable,b=e.singleLine,j=e.textAlign,k=e.verticalAlign,y=e.warning,S=e.width,N=(0,l.Z)((0,i.lG)(t,"active"),(0,i.lG)(u,"collapsing"),(0,i.lG)(p,"disabled"),(0,i.lG)(m,"error"),(0,i.lG)(x,"negative"),(0,i.lG)(w,"positive"),(0,i.lG)(Z,"selectable"),(0,i.lG)(b,"single line"),(0,i.lG)(y,"warning"),(0,i.X4)(j),(0,i.Ok)(k),(0,i.H0)(S,"wide"),r),A=(0,o.Z)(g,e),P=(0,c.Z)(g,e);return d.kK(n)?s.createElement(P,(0,a.Z)({},A,{className:N}),h.Z.create(f),v):s.createElement(P,(0,a.Z)({},A,{className:N}),n)}g.handledProps=["active","as","children","className","collapsing","content","disabled","error","icon","negative","positive","selectable","singleLine","textAlign","verticalAlign","warning","width"],g.defaultProps={as:"td"},g.propTypes={},g.create=(0,p.u5)(g,(function(e){return{content:e}}));var m=g;function f(e){var t=e.children,n=e.className,r=e.content,u=e.fullWidth,v=(0,l.Z)((0,i.lG)(u,"full-width"),n),p=(0,o.Z)(f,e),h=(0,c.Z)(f,e);return s.createElement(h,(0,a.Z)({},p,{className:v}),d.kK(t)?r:t)}f.handledProps=["as","children","className","content","fullWidth"],f.defaultProps={as:"thead"},f.propTypes={};var x=f;function w(e){var t=e.as,n=(0,o.Z)(w,e);return s.createElement(x,(0,a.Z)({},n,{as:t}))}w.handledProps=["as"],w.propTypes={},w.defaultProps={as:"tfoot"};var Z=w;function b(e){var t=e.as,n=e.className,r=e.sorted,c=(0,l.Z)((0,i.cD)(r,"sorted"),n),d=(0,o.Z)(b,e);return s.createElement(m,(0,a.Z)({},d,{as:t,className:c}))}b.handledProps=["as","className","sorted"],b.propTypes={},b.defaultProps={as:"th"};var j=b;function k(e){var t=e.active,n=e.cellAs,u=e.cells,v=e.children,p=e.className,h=e.disabled,g=e.error,f=e.negative,x=e.positive,w=e.textAlign,Z=e.verticalAlign,b=e.warning,j=(0,l.Z)((0,i.lG)(t,"active"),(0,i.lG)(h,"disabled"),(0,i.lG)(g,"error"),(0,i.lG)(f,"negative"),(0,i.lG)(x,"positive"),(0,i.lG)(b,"warning"),(0,i.X4)(w),(0,i.Ok)(Z),p),y=(0,o.Z)(k,e),S=(0,c.Z)(k,e);return d.kK(v)?s.createElement(S,(0,a.Z)({},y,{className:j}),(0,r.Z)(u,(function(e){return m.create(e,{defaultProps:{as:n}})}))):s.createElement(S,(0,a.Z)({},y,{className:j}),v)}k.handledProps=["active","as","cellAs","cells","children","className","disabled","error","negative","positive","textAlign","verticalAlign","warning"],k.defaultProps={as:"tr",cellAs:"td"},k.propTypes={},k.create=(0,p.u5)(k,(function(e){return{cells:e}}));var y=k;function S(e){var t=e.attached,n=e.basic,u=e.celled,p=e.children,h=e.className,g=e.collapsing,m=e.color,f=e.columns,w=e.compact,b=e.definition,j=e.fixed,k=e.footerRow,N=e.headerRow,A=e.headerRows,P=e.inverted,C=e.padded,G=e.renderBodyRow,B=e.selectable,I=e.singleLine,E=e.size,D=e.sortable,W=e.stackable,T=e.striped,H=e.structured,M=e.tableData,R=e.textAlign,L=e.unstackable,O=e.verticalAlign,F=(0,l.Z)("ui",m,E,(0,i.lG)(u,"celled"),(0,i.lG)(g,"collapsing"),(0,i.lG)(b,"definition"),(0,i.lG)(j,"fixed"),(0,i.lG)(P,"inverted"),(0,i.lG)(B,"selectable"),(0,i.lG)(I,"single line"),(0,i.lG)(D,"sortable"),(0,i.lG)(W,"stackable"),(0,i.lG)(T,"striped"),(0,i.lG)(H,"structured"),(0,i.lG)(L,"unstackable"),(0,i.sU)(t,"attached"),(0,i.sU)(n,"basic"),(0,i.sU)(w,"compact"),(0,i.sU)(C,"padded"),(0,i.X4)(R),(0,i.Ok)(O),(0,i.H0)(f,"column"),"table",h),_=(0,o.Z)(S,e),z=(0,c.Z)(S,e);if(!d.kK(p))return s.createElement(z,(0,a.Z)({},_,{className:F}),p);var J={defaultProps:{cellAs:"th"}},U=(N||A)&&s.createElement(x,null,y.create(N,J),(0,r.Z)(A,(function(e){return y.create(e,J)})));return s.createElement(z,(0,a.Z)({},_,{className:F}),U,s.createElement(v,null,G&&(0,r.Z)(M,(function(e,t){return y.create(G(e,t))}))),k&&s.createElement(Z,null,y.create(k)))}S.handledProps=["as","attached","basic","celled","children","className","collapsing","color","columns","compact","definition","fixed","footerRow","headerRow","headerRows","inverted","padded","renderBodyRow","selectable","singleLine","size","sortable","stackable","striped","structured","tableData","textAlign","unstackable","verticalAlign"],S.defaultProps={as:"table"},S.propTypes={},S.Body=v,S.Cell=m,S.Footer=Z,S.Header=x,S.HeaderCell=j,S.Row=y;var N=S},2530:function(){}}]);
//# sourceMappingURL=978.e52f56b9.chunk.js.map