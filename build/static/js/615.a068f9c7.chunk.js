"use strict";(self.webpackChunkplay_ab_web=self.webpackChunkplay_ab_web||[]).push([[615],{1615:function(n,a,e){e.a(n,(async function(n,t){try{e.r(a),e.d(a,{UserDetailsComponent:function(){return k}});var i=e(1413),s=e(9439),r=e(3144),o=e(5671),l=e(2791),d=(e(5630),e(899)),c=e(7344),u=e(2836),h=e(2111),m=e(6303),g=e(4863),p=e(7900),v=e(1952),w=e(763),x=e(2426),f=e.n(x),j=e(7689),y=e(3656),Z=e(1694),b=e.n(Z),S=e(7335),I=e(184),W=n([p]);p=(W.then?(await W)():W)[0];var D=(0,r.Z)((function n(){(0,o.Z)(this,n),this.loading=!0,this.list=[],this.yearTotalWinnings=0,this.yearTotalWithdrawals=0,this.userDetails=void 0})),k=(0,l.memo)((function(){var n,a,e,t,r=null===(n=(0,j.TH)().pathname.split("/").pop())||void 0===n?void 0:n.replace("@",""),o=(0,l.useState)(new D),x=(0,s.Z)(o,2),Z=x[0],W=x[1];return(0,l.useEffect)((function(){W((function(n){return(0,i.Z)((0,i.Z)({},n),{},{loading:!0})})),(0,S.D)([p.b.getBetSummary({email:r}),p.b.getBonuses({email:r}),p.b.getWithdrawals({email:r}),p.b.getUser({email:r})]).subscribe((function(n){var a=(0,s.Z)(n,4),e=a[0],t=a[1],r=a[2],o=a[3],l=null===t||void 0===t?void 0:t.filter((function(n){return"Approved"===n.TransactionStatus&&"Bonus"===n.TransactionType&&"Bonus"===n.PaymentMethodInfo})),d=null===r||void 0===r?void 0:r.filter((function(n){return"Approved"===n.TransactionStatus}));console.log("gaga-------------------------------bonusList------",l),console.log("gaga-------------------------------withdrawalList------",d);var c=Array.from(Array(f()().isoWeeksInYear()).keys()).map((function(n){var a=f()().format("YYYY"),t=f()(a).add(n,"weeks"),i=f()(t).format("MMM"),s=f()(t).format("M"),r=f()(t).startOf("week").add(1,"day").toISOString(),o=f()(t).endOf("week").toISOString(),c=new Date(r),u=new Date(o);c.setUTCHours(0,0,0,0),u.setUTCHours(23,59,59,999);var h=null===e||void 0===e?void 0:e.find((function(n){return n.startDate===c.toISOString()&&n.endDate===u.toISOString()&&n.year===parseInt(a,10)})),m=null===l||void 0===l?void 0:l.find((function(n){var a=f()(n.TransactionDateTime).subtract(7,"days");return a.isAfter(c)&&a.isBefore(u)})),g=null===d||void 0===d?void 0:d.find((function(n){var a=f()(n.TransactionDateTime);return a.isAfter(c)&&a.isBefore(u)})),p=0;return m&&h&&(p=m.Amount+((null===h||void 0===h?void 0:h.betSummary.totalEarnings)||0)),{_id:"".concat(i,"-").concat(n),mon:s+"-"+i,year:a,startDate:c.toISOString(),endDate:u.toISOString(),bonus:(null===m||void 0===m?void 0:m.Amount)||(null===h||void 0===h?void 0:h.betSummary.bonus)||0,totalStaked:(null===h||void 0===h?void 0:h.betSummary.totalStaked)||0,totalEarnings:(null===h||void 0===h?void 0:h.betSummary.totalEarnings)||0,winnings:p,approxWinnings:(null===h||void 0===h?void 0:h.betSummary.winnings)||0,loading:!1,fetch:0,title:i,withdrawal:g}})),u=(0,w.groupBy)(c,"mon"),h=Object.keys(u).map((function(n){return{title:n.split("-")[1],data:u[n]}}));console.log("gaga----------------------------defaultList---------",h);var m=(0,w.sumBy)(h,(function(n){return(0,w.sumBy)(n.data,"winnings")})),g=(0,w.sumBy)(h,(function(n){return(0,w.sumBy)(n.data,"withdrawal.Amount")}));console.log("gaga----------------------userDetails---------------",o),W((function(n){return(0,i.Z)((0,i.Z)({},n),{},{loading:!1,yearTotalWinnings:m,yearTotalWithdrawals:g,list:h,userDetails:o})}))}))}),[r]),(0,I.jsx)("div",{className:"user-details-wrap",children:(0,I.jsxs)(d.Z,{inverted:!0,children:[(0,I.jsxs)("div",{className:"ttl",children:[(0,I.jsx)("span",{children:r}),(0,I.jsx)("div",{className:"row-wrap between",children:(0,I.jsx)(c.Z,{on:"hover",basic:!0,trigger:(0,I.jsx)(u.Z,{name:"info circle"}),position:"bottom right",mouseLeaveDelay:3e3,children:(0,I.jsxs)(h.Z,{vertical:!0,children:[(0,I.jsx)(h.Z.Item,{header:!0,children:(0,I.jsxs)("span",{children:["Year ",f()().format("YYYY")]})}),(0,I.jsxs)(h.Z.Item,{children:[(0,I.jsx)(m.Z,{color:"green",children:(0,y.WI)((null===(a=Z.userDetails)||void 0===a||null===(e=a[0].data)||void 0===e||null===(t=e.userSession)||void 0===t?void 0:t.cash)||0)}),(0,I.jsx)("span",{children:"Cash"})]}),(0,I.jsxs)(h.Z.Item,{children:[(0,I.jsx)(m.Z,{color:"green",children:(0,y.WI)(Z.yearTotalWinnings)}),(0,I.jsx)("span",{children:"Earnings"})]}),(0,I.jsxs)(h.Z.Item,{children:[(0,I.jsx)(m.Z,{color:"purple",children:(0,y.WI)(Math.abs(Z.yearTotalWithdrawals||0))}),(0,I.jsx)("span",{children:"Cashout"})]})]})})})]}),(0,I.jsx)("hr",{}),(0,I.jsx)("div",{className:"user-details-content-wrap",children:Z.list.map((function(n){var a=(0,w.sumBy)(n.data,"winnings");return(0,I.jsxs)("div",{className:"mon-wrap",children:[(0,I.jsxs)("div",{className:"ttl-wrap",children:[(0,I.jsx)(g.Z,{as:"h3",inverted:!0,children:n.title}),(0,I.jsx)(g.Z,{className:b()({winnings:a>0,losses:a<0}),as:"h4",inverted:!0,children:(0,y.WI)(a)})]}),(0,I.jsx)("hr",{}),(0,I.jsx)("div",{className:"week-wrap",children:n.data.map((function(n){return(0,I.jsxs)("div",{className:"week",children:[!!n.withdrawal&&(0,I.jsxs)(c.Z,{on:"click",position:"top center",trigger:(0,I.jsx)("div",{className:"has-withdrawal"}),children:[(0,I.jsx)(c.Z.Header,{children:"Withdrawal"}),(0,I.jsx)(c.Z.Content,{children:"".concat(n.withdrawal.PaymentMethodInfo," ").concat((0,y.WI)(n.withdrawal.Amount))})]}),(0,I.jsx)("div",{className:"week-date",children:(0,I.jsxs)("span",{children:[f()(n.startDate).utc().format("ddd DD")," -"," ",f()(n.endDate).utc().format("ddd DD")]})}),(0,I.jsxs)("div",{className:"week-content",children:[(0,I.jsxs)("div",{className:"row-wrap",children:[(0,I.jsx)("span",{children:"Staked"}),(0,I.jsx)("span",{children:(0,y.WI)(n.totalStaked)})]}),(0,I.jsxs)("div",{className:"row-wrap",children:[(0,I.jsx)("span",{children:"Earnings"}),(0,I.jsx)("span",{children:(0,y.WI)(n.totalEarnings)})]}),(0,I.jsxs)("div",{className:"row-wrap",children:[(0,I.jsx)("span",{children:"Bonus"}),(0,I.jsx)("span",{children:(0,y.WI)(n.bonus)})]}),0===n.winnings&&n.totalStaked>0&&(0,I.jsxs)("div",{className:"row-wrap",children:[(0,I.jsx)("span",{children:"Winnings"}),(0,I.jsx)(c.Z,{content:"Approximate Earnings.",position:"top center",trigger:(0,I.jsx)("span",{className:b()({approx:!0}),children:(0,y.WI)(n.approxWinnings)})})]})||(0,I.jsxs)("div",{className:"row-wrap",children:[(0,I.jsx)("span",{children:"Winnings"}),(0,I.jsx)("span",{className:b()({winnings:n.winnings>0,losses:n.winnings<0}),children:(0,y.WI)(n.winnings)})]})]})]},n._id)}))})]},n.title)}))}),(0,I.jsx)(v.o,{loading:Z.loading})]})})}));t()}catch(N){t(N)}}))},1952:function(n,a,e){e.d(a,{o:function(){return h}});var t=e(1413),i=e(9439),s=e(3144),r=e(5671),o=e(2791),l=e(1487),d=e(2417),c=e(184),u=(0,s.Z)((function n(a){(0,r.Z)(this,n),this.loading=!1,this.content="",this.loading=a.loading,this.content=a.content})),h=function(n){var a=(0,o.useState)(new u(n)),e=(0,i.Z)(a,2),s=e[0],r=e[1];return(0,o.useEffect)((function(){r((function(a){return(0,t.Z)((0,t.Z)({},a),{},{loading:n.loading})}))}),[n.loading]),(0,c.jsx)(l.Z,(0,t.Z)((0,t.Z)({style:{position:"absolute",top:0,left:0,right:0,bottom:0}},s.loading?{active:!0}:{}),{},{children:(0,c.jsx)(d.Z,{})}))}},5630:function(){}}]);
//# sourceMappingURL=615.a068f9c7.chunk.js.map