"use strict";(self.webpackChunkplay_ab_web=self.webpackChunkplay_ab_web||[]).push([[615],{1615:function(n,e,a){a.a(n,(async function(n,i){try{a.r(e),a.d(e,{UserDetailsComponent:function(){return k}});var s=a(1413),t=a(9439),r=a(3144),o=a(5671),l=a(2791),d=(a(5630),a(899)),c=a(7344),u=a(2836),h=a(2111),m=a(4863),v=a(6303),g=a(7900),p=a(1952),x=a(763),w=a(2426),j=a.n(w),f=a(7689),Z=a(3656),y=a(1694),b=a.n(y),S=a(7335),I=a(184),W=n([g]);g=(W.then?(await W)():W)[0];var D=(0,r.Z)((function n(){(0,o.Z)(this,n),this.loading=!0,this.list=[],this.yearTotalWinnings=0,this.yearTotalWithdrawals=0,this.userDetails=void 0})),k=(0,l.memo)((function(){var n,e,a,i,r,o,w,y=null===(n=(0,f.TH)().pathname.split("/").pop())||void 0===n?void 0:n.replace("@",""),W=(0,l.useState)(new D),k=(0,t.Z)(W,2),N=k[0],T=k[1];return(0,l.useEffect)((function(){T((function(n){return(0,s.Z)((0,s.Z)({},n),{},{loading:!0})})),(0,S.D)([g.b.getBetSummary({email:y}),g.b.getBonuses({email:y}),g.b.getWithdrawals({email:y}),g.b.getUser({email:y})]).subscribe((function(n){var e=(0,t.Z)(n,4),a=e[0],i=e[1],r=e[2],o=e[3],l=null===i||void 0===i?void 0:i.filter((function(n){return"Approved"===n.TransactionStatus&&"Bonus"===n.TransactionType&&"Bonus"===n.PaymentMethodInfo})),d=null===r||void 0===r?void 0:r.filter((function(n){return["Approved","Pending"].includes(n.TransactionStatus)}));console.log("gaga-------------------------------bonusList------",l),console.log("gaga-------------------------------withdrawalList------",d);var c=Array.from(Array(j()().isoWeeksInYear()).keys()).map((function(n){var e=j()().format("YYYY"),i=j()(e).add(n,"weeks"),s=j()(i).format("MMM"),t=j()(i).format("M"),r=j()(i).startOf("week").add(1,"day").toISOString(),o=j()(i).endOf("week").toISOString(),c=new Date(r),u=new Date(o);c.setUTCHours(0,0,0,0),u.setUTCHours(23,59,59,999);var h=null===a||void 0===a?void 0:a.find((function(n){return n.startDate===c.toISOString()&&n.endDate===u.toISOString()&&n.year===parseInt(e,10)})),m=null===l||void 0===l?void 0:l.find((function(n){var e=j()(n.TransactionDateTime).subtract(7,"days");return e.isAfter(c)&&e.isBefore(u)})),v=null===d||void 0===d?void 0:d.find((function(n){var e=j()(n.TransactionDateTime);return e.isAfter(c)&&e.isBefore(u)})),g=0;return m&&h&&(g=m.Amount+((null===h||void 0===h?void 0:h.betSummary.totalEarnings)||0)),{_id:"".concat(s,"-").concat(n),mon:t+"-"+s,year:e,startDate:c.toISOString(),endDate:u.toISOString(),bonus:(null===m||void 0===m?void 0:m.Amount)||(null===h||void 0===h?void 0:h.betSummary.bonus)||0,totalStaked:(null===h||void 0===h?void 0:h.betSummary.totalStaked)||0,totalEarnings:(null===h||void 0===h?void 0:h.betSummary.totalEarnings)||0,winnings:g,approxWinnings:(null===h||void 0===h?void 0:h.betSummary.winnings)||0,loading:!1,fetch:0,title:s,withdrawal:v}})),u=(0,x.groupBy)(c,"mon"),h=Object.keys(u).map((function(n){return{title:n.split("-")[1],data:u[n]}}));console.log("gaga----------------------------defaultList---------",h);var m=(0,x.sumBy)(h,(function(n){return(0,x.sumBy)(n.data,"winnings")})),v=(0,x.sumBy)(h,(function(n){return(0,x.sumBy)(n.data,"withdrawal.Amount")}));console.log("gaga----------------------userDetails---------------",o),T((function(n){return(0,s.Z)((0,s.Z)({},n),{},{loading:!1,yearTotalWinnings:m,yearTotalWithdrawals:v,list:h,userDetails:o})}))}))}),[y]),(0,I.jsx)("div",{className:"user-details-wrap",children:(0,I.jsxs)(d.Z,{inverted:!0,children:[(0,I.jsxs)("div",{className:"ttl",children:[(0,I.jsx)("span",{children:y}),(0,I.jsx)("div",{className:"row-wrap between",children:(0,I.jsx)(c.Z,{on:"hover",basic:!0,trigger:(0,I.jsx)(u.Z,{name:"info circle"}),position:"bottom right",mouseLeaveDelay:6e4,children:(0,I.jsxs)(h.Z,{vertical:!0,children:[(0,I.jsx)(h.Z.Item,{header:!0,children:(0,I.jsxs)(m.Z,{as:"h3",children:["Year ",j()().format("YYYY")," Details"]})}),(0,I.jsxs)(h.Z.Item,{children:[(0,I.jsx)(m.Z,{as:"h4",children:"Current Balance"}),(0,I.jsx)("p",{children:(0,I.jsx)(v.Z,{color:"green",children:(0,Z.WI)((null===(e=N.userDetails)||void 0===e||null===(a=e[0].data)||void 0===a||null===(i=a.userSession)||void 0===i?void 0:i.cash)||0)})})]}),(0,I.jsxs)(h.Z.Item,{children:[(0,I.jsx)(m.Z,{as:"h4",children:"Available Cashout"}),(0,I.jsx)("p",{children:(0,I.jsx)(v.Z,{color:"orange",children:(0,Z.WI)((null===(r=N.userDetails)||void 0===r||null===(o=r[0].data)||void 0===o||null===(w=o.userSession)||void 0===w?void 0:w.cashout)||0)})})]}),(0,I.jsxs)(h.Z.Item,{children:[(0,I.jsx)(m.Z,{as:"h4",children:"Total Earnings this year"}),(0,I.jsx)("p",{children:(0,I.jsx)(v.Z,{color:"purple",children:(0,Z.WI)(N.yearTotalWinnings)})})]}),(0,I.jsxs)(h.Z.Item,{children:[(0,I.jsx)(m.Z,{as:"h4",children:"Total Cashout this year"}),(0,I.jsx)("p",{children:(0,I.jsxs)(v.Z,{color:"red",children:[" ",(0,Z.WI)(Math.abs(N.yearTotalWithdrawals||0))]})})]})]})})})]}),(0,I.jsx)("hr",{}),(0,I.jsx)("div",{className:"user-details-content-wrap",children:N.list.map((function(n){var e=(0,x.sumBy)(n.data,"winnings");return(0,I.jsxs)("div",{className:"mon-wrap",children:[(0,I.jsxs)("div",{className:"ttl-wrap",children:[(0,I.jsx)(m.Z,{as:"h3",inverted:!0,children:n.title}),(0,I.jsx)(m.Z,{className:b()({winnings:e>0,losses:e<0}),as:"h4",inverted:!0,children:(0,Z.WI)(e)})]}),(0,I.jsx)("hr",{}),(0,I.jsx)("div",{className:"week-wrap",children:n.data.map((function(n){return(0,I.jsxs)("div",{className:"week",children:[!!n.withdrawal&&(0,I.jsxs)(c.Z,{on:"click",position:"top center",trigger:(0,I.jsx)("div",{className:"has-withdrawal"}),children:[(0,I.jsx)(c.Z.Header,{children:"Withdrawal"}),(0,I.jsx)(c.Z.Content,{children:"".concat(n.withdrawal.PaymentMethodInfo," ").concat((0,Z.WI)(n.withdrawal.Amount))})]}),(0,I.jsx)("div",{className:"week-date",children:(0,I.jsxs)("span",{children:[j()(n.startDate).utc().format("ddd DD")," -"," ",j()(n.endDate).utc().format("ddd DD")]})}),(0,I.jsxs)("div",{className:"week-content",children:[(0,I.jsxs)("div",{className:"row-wrap",children:[(0,I.jsx)("span",{children:"Staked"}),(0,I.jsx)("span",{children:(0,Z.WI)(n.totalStaked)})]}),(0,I.jsxs)("div",{className:"row-wrap",children:[(0,I.jsx)("span",{children:"Earnings"}),(0,I.jsx)("span",{children:(0,Z.WI)(n.totalEarnings)})]}),(0,I.jsxs)("div",{className:"row-wrap",children:[(0,I.jsx)("span",{children:"Bonus"}),(0,I.jsx)("span",{children:(0,Z.WI)(n.bonus)})]}),0===n.winnings&&n.totalStaked>0&&(0,I.jsxs)("div",{className:"row-wrap",children:[(0,I.jsx)("span",{children:"Winnings"}),(0,I.jsx)(c.Z,{content:"Approximate Earnings.",position:"top center",trigger:(0,I.jsx)("span",{className:b()({approx:!0}),children:(0,Z.WI)(n.approxWinnings)})})]})||(0,I.jsxs)("div",{className:"row-wrap",children:[(0,I.jsx)("span",{children:"Winnings"}),(0,I.jsx)("span",{className:b()({winnings:n.winnings>0,losses:n.winnings<0}),children:(0,Z.WI)(n.winnings)})]})]})]},n._id)}))})]},n.title)}))}),(0,I.jsx)(p.o,{loading:N.loading})]})})}));i()}catch(N){i(N)}}))},1952:function(n,e,a){a.d(e,{o:function(){return h}});var i=a(1413),s=a(9439),t=a(3144),r=a(5671),o=a(2791),l=a(1487),d=a(2417),c=a(184),u=(0,t.Z)((function n(e){(0,r.Z)(this,n),this.loading=!1,this.content="",this.loading=e.loading,this.content=e.content})),h=function(n){var e=(0,o.useState)(new u(n)),a=(0,s.Z)(e,2),t=a[0],r=a[1];return(0,o.useEffect)((function(){r((function(e){return(0,i.Z)((0,i.Z)({},e),{},{loading:n.loading})}))}),[n.loading]),(0,c.jsx)(l.Z,(0,i.Z)((0,i.Z)({style:{position:"absolute",top:0,left:0,right:0,bottom:0}},t.loading?{active:!0}:{}),{},{children:(0,c.jsx)(d.Z,{})}))}},5630:function(){}}]);
//# sourceMappingURL=615.ec6c9f69.chunk.js.map