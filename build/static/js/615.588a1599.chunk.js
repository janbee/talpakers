"use strict";(self.webpackChunkplay_ab_web=self.webpackChunkplay_ab_web||[]).push([[615],{1615:function(n,a,s){s.a(n,(async function(n,i){try{s.r(a),s.d(a,{UserDetailsComponent:function(){return W}});var t=s(1413),e=s(9439),r=s(3144),o=s(5671),l=s(2791),d=(s(5630),s(899)),c=s(4863),u=s(1425),h=s(7900),m=s(1952),w=s(763),g=s(2426),p=s.n(g),v=s(7689),f=s(3656),x=s(1694),j=s.n(x),y=s(7335),b=s(184),S=n([h]);h=(S.then?(await S)():S)[0];var N=(0,r.Z)((function n(){(0,o.Z)(this,n),this.loading=!0,this.list=[],this.yearTotalWinnings=0,this.yearTotalWithdrawals=0})),W=(0,l.memo)((function(){var n,a=null===(n=(0,v.TH)().pathname.split("/").pop())||void 0===n?void 0:n.replace("@",""),s=(0,l.useState)(new N),i=(0,e.Z)(s,2),r=i[0],o=i[1];return(0,l.useEffect)((function(){o((function(n){return(0,t.Z)((0,t.Z)({},n),{},{loading:!0})})),(0,y.D)([h.b.getBetSummary({email:a}),h.b.getBonuses({email:a}),h.b.getWithdrawals({email:a})]).subscribe((function(n){var a=(0,e.Z)(n,3),s=a[0],i=a[1],r=a[2],l=null===i||void 0===i?void 0:i.filter((function(n){return"Approved"===n.TransactionStatus&&"Bonus"===n.TransactionType&&"Bonus"===n.PaymentMethodInfo})),d=null===r||void 0===r?void 0:r.filter((function(n){return"Approved"===n.TransactionStatus}));console.log("gaga-------------------------------bonusList------",l),console.log("gaga-------------------------------withdrawalList------",d);var c=Array.from(Array(p()().isoWeeksInYear()).keys()).map((function(n){var a=p()().format("YYYY"),i=p()(a).add(n,"weeks"),t=p()(i).format("MMM"),e=p()(i).format("M"),r=p()(i).startOf("week").add(1,"day").toISOString(),o=p()(i).endOf("week").toISOString(),c=new Date(r),u=new Date(o);c.setUTCHours(0,0,0,0),u.setUTCHours(23,59,59,999);var h=null===s||void 0===s?void 0:s.find((function(n){return n.startDate===c.toISOString()&&n.endDate===u.toISOString()&&n.year===parseInt(a,10)})),m=null===l||void 0===l?void 0:l.find((function(n){var a=p()(n.TransactionDateTime).subtract(7,"days");return a.isAfter(c)&&a.isBefore(u)})),w=null===d||void 0===d?void 0:d.find((function(n){var a=p()(n.TransactionDateTime);return a.isAfter(c)&&a.isBefore(u)})),g=0;return m&&h&&(g=m.Amount+((null===h||void 0===h?void 0:h.betSummary.totalEarnings)||0)),{_id:"".concat(t,"-").concat(n),mon:e+"-"+t,year:a,startDate:c.toISOString(),endDate:u.toISOString(),bonus:(null===m||void 0===m?void 0:m.Amount)||(null===h||void 0===h?void 0:h.betSummary.bonus)||0,totalStaked:(null===h||void 0===h?void 0:h.betSummary.totalStaked)||0,totalEarnings:(null===h||void 0===h?void 0:h.betSummary.totalEarnings)||0,winnings:g,approxWinnings:(null===h||void 0===h?void 0:h.betSummary.winnings)||0,loading:!1,fetch:0,title:t,withdrawal:w}})),u=(0,w.groupBy)(c,"mon"),h=Object.keys(u).map((function(n){return{title:n.split("-")[1],data:u[n]}}));console.log("gaga----------------------------defaultList---------",h);var m=(0,w.sumBy)(h,(function(n){return(0,w.sumBy)(n.data,"winnings")})),g=(0,w.sumBy)(h,(function(n){return(0,w.sumBy)(n.data,"withdrawal.Amount")}));o((function(n){return(0,t.Z)((0,t.Z)({},n),{},{loading:!1,yearTotalWinnings:m,yearTotalWithdrawals:g,list:h})}))}))}),[a]),(0,b.jsx)("div",{className:"user-details-wrap",children:(0,b.jsxs)(d.Z,{inverted:!0,children:[(0,b.jsxs)("div",{className:"ttl",children:[(0,b.jsx)("span",{children:a}),(0,b.jsxs)("div",{className:"row-wrap between",children:[(0,b.jsx)("span",{children:p()().format("YYYY")}),(0,b.jsxs)("div",{className:"winnings-withdrawal-wrap",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("span",{className:"lbl",children:"Earnings"}),(0,b.jsx)("span",{className:j()({winnings:r.yearTotalWinnings>0,losses:r.yearTotalWinnings<0}),children:"".concat((0,f.WI)(r.yearTotalWinnings))})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("span",{className:"lbl",children:"Cashout"}),(0,b.jsx)("span",{className:j()({losses:!0}),children:"".concat((0,f.WI)(Math.abs(r.yearTotalWithdrawals||0)))})]})]})]})]}),(0,b.jsx)("hr",{}),(0,b.jsx)("div",{className:"user-details-content-wrap",children:r.list.map((function(n){var a=(0,w.sumBy)(n.data,"winnings");return(0,b.jsxs)("div",{className:"mon-wrap",children:[(0,b.jsxs)("div",{className:"ttl-wrap",children:[(0,b.jsx)(c.Z,{as:"h3",inverted:!0,children:n.title}),(0,b.jsx)(c.Z,{className:j()({winnings:a>0,losses:a<0}),as:"h4",inverted:!0,children:(0,f.WI)(a)})]}),(0,b.jsx)("hr",{}),(0,b.jsx)("div",{className:"week-wrap",children:n.data.map((function(n){return(0,b.jsxs)("div",{className:"week",children:[!!n.withdrawal&&(0,b.jsxs)(u.Z,{on:"click",position:"top center",trigger:(0,b.jsx)("div",{className:"has-withdrawal"}),children:[(0,b.jsx)(u.Z.Header,{children:"Withdrawal"}),(0,b.jsx)(u.Z.Content,{children:"".concat(n.withdrawal.PaymentMethodInfo," ").concat((0,f.WI)(n.withdrawal.Amount))})]}),(0,b.jsx)("div",{className:"week-date",children:(0,b.jsxs)("span",{children:[p()(n.startDate).utc().format("ddd DD")," -"," ",p()(n.endDate).utc().format("ddd DD")]})}),(0,b.jsxs)("div",{className:"week-content",children:[(0,b.jsxs)("div",{className:"row-wrap",children:[(0,b.jsx)("span",{children:"Staked"}),(0,b.jsx)("span",{children:(0,f.WI)(n.totalStaked)})]}),(0,b.jsxs)("div",{className:"row-wrap",children:[(0,b.jsx)("span",{children:"Earnings"}),(0,b.jsx)("span",{children:(0,f.WI)(n.totalEarnings)})]}),(0,b.jsxs)("div",{className:"row-wrap",children:[(0,b.jsx)("span",{children:"Bonus"}),(0,b.jsx)("span",{children:(0,f.WI)(n.bonus)})]}),0===n.winnings&&n.totalStaked>0&&(0,b.jsxs)("div",{className:"row-wrap",children:[(0,b.jsx)("span",{children:"Winnings"}),(0,b.jsx)(u.Z,{content:"Approximate Earnings.",position:"top center",trigger:(0,b.jsx)("span",{className:j()({approx:!0}),children:(0,f.WI)(n.approxWinnings)})})]}),n.winnings>0&&(0,b.jsxs)("div",{className:"row-wrap",children:[(0,b.jsx)("span",{children:"Winnings"}),(0,b.jsx)("span",{className:j()({winnings:n.winnings>0,losses:n.winnings<0}),children:(0,f.WI)(n.winnings)})]})]})]},n._id)}))})]},n.title)}))}),(0,b.jsx)(m.o,{loading:r.loading})]})})}));i()}catch(Z){i(Z)}}))},1952:function(n,a,s){s.d(a,{o:function(){return h}});var i=s(1413),t=s(9439),e=s(3144),r=s(5671),o=s(2791),l=s(1487),d=s(2417),c=s(184),u=(0,e.Z)((function n(a){(0,r.Z)(this,n),this.loading=!1,this.content="",this.loading=a.loading,this.content=a.content})),h=function(n){var a=(0,o.useState)(new u(n)),s=(0,t.Z)(a,2),e=s[0],r=s[1];return(0,o.useEffect)((function(){r((function(a){return(0,i.Z)((0,i.Z)({},a),{},{loading:n.loading})}))}),[n.loading]),(0,c.jsx)(l.Z,(0,i.Z)((0,i.Z)({style:{position:"absolute",top:0,left:0,right:0,bottom:0}},e.loading?{active:!0}:{}),{},{children:(0,c.jsx)(d.Z,{})}))}},5630:function(){}}]);
//# sourceMappingURL=615.588a1599.chunk.js.map