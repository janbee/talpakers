"use strict";(self.webpackChunkplay_ab_web=self.webpackChunkplay_ab_web||[]).push([[615],{1615:function(n,s,t){t.a(n,(async function(n,a){try{t.r(s),t.d(s,{UserDetailsComponent:function(){return b}});var e=t(1413),i=t(9439),r=t(3144),o=t(5671),l=t(2791),d=(t(5630),t(899)),c=t(4863),u=t(7900),g=t(1952),m=t(763),h=t(2426),p=t.n(h),f=t(7689),v=t(3656),w=t(1694),j=t.n(w),x=t(184),y=n([u]);u=(y.then?(await y)():y)[0];var S=(0,r.Z)((function n(){(0,o.Z)(this,n),this.loading=!0,this.list=[],this.yearTotalWinnings=0})),b=(0,l.memo)((function(){var n,s=null===(n=(0,f.TH)().pathname.split("/").pop())||void 0===n?void 0:n.replace("@",""),t=(0,l.useState)(new S),a=(0,i.Z)(t,2),r=a[0],o=a[1];return(0,l.useEffect)((function(){o((function(n){return(0,e.Z)((0,e.Z)({},n),{},{loading:!0})})),u.b.getBetSummary({email:s}).subscribe((function(n){console.log("gaga-----------------------------------getSettledBets--",n);var s=Array.from(Array(p()().isoWeeksInYear()).keys()).map((function(s){var t=p()().format("YYYY"),a=p()(t).add(s,"weeks"),e=p()(a).format("MMM"),i=p()(a).format("M"),r=p()(a).startOf("week").add(1,"day").toISOString(),o=p()(a).endOf("week").toISOString(),l=new Date(r),d=new Date(o);l.setUTCHours(0,0,0,0),d.setUTCHours(23,59,59,999);var c=null===n||void 0===n?void 0:n.find((function(n){return n.startDate===l.toISOString()&&n.endDate===d.toISOString()&&n.year===parseInt(t,10)}));return console.log("gaga--------------------betSummary-----------------",c),{_id:"".concat(e,"-").concat(s),mon:i+"-"+e,year:t,startDate:l.toISOString(),endDate:d.toISOString(),bonus:(null===c||void 0===c?void 0:c.betSummary.bonus)||0,totalStaked:(null===c||void 0===c?void 0:c.betSummary.totalStaked)||0,totalEarnings:(null===c||void 0===c?void 0:c.betSummary.totalEarnings)||0,winnings:(null===c||void 0===c?void 0:c.betSummary.winnings)||0,loading:!1,fetch:0,title:e}})),t=(0,m.groupBy)(s,"mon"),a=Object.keys(t).map((function(n){return{title:n.split("-")[1],data:t[n]}}));console.log("gaga-------------------------------------",a);var i=(0,m.sumBy)(a,(function(n){return(0,m.sumBy)(n.data,"winnings")}));o((function(n){return(0,e.Z)((0,e.Z)({},n),{},{loading:!1,yearTotalWinnings:i,list:a})}))}))}),[s]),(0,x.jsx)("div",{className:"user-details-wrap",children:(0,x.jsxs)(d.Z,{inverted:!0,children:[(0,x.jsxs)("div",{className:"ttl",children:[(0,x.jsx)("span",{children:s}),(0,x.jsxs)("span",{children:[p()().format("YYYY")," earnings",(0,x.jsx)("span",{className:j()({winnings:r.yearTotalWinnings>0,losses:r.yearTotalWinnings<0}),children:" "+(0,v.WI)(r.yearTotalWinnings)})]})]}),(0,x.jsx)("hr",{}),(0,x.jsx)("div",{className:"user-details-content-wrap",children:r.list.map((function(n){var s=(0,m.sumBy)(n.data,"winnings");return(0,x.jsxs)("div",{className:"mon-wrap",children:[(0,x.jsxs)("div",{className:"ttl-wrap",children:[(0,x.jsx)(c.Z,{as:"h3",inverted:!0,children:n.title}),(0,x.jsx)(c.Z,{className:j()({winnings:s>0,losses:s<0}),as:"h4",inverted:!0,children:(0,v.WI)(s)})]}),(0,x.jsx)("hr",{}),(0,x.jsx)("div",{className:"week-wrap",children:n.data.map((function(n){return(0,x.jsxs)("div",{className:"week",children:[(0,x.jsx)("div",{className:"week-date",children:(0,x.jsxs)("span",{children:[p()(n.startDate).utc().format("ddd DD")," -"," ",p()(n.endDate).utc().format("ddd DD")]})}),(0,x.jsxs)("div",{className:"week-content",children:[(0,x.jsxs)("div",{className:"row-wrap",children:[(0,x.jsx)("span",{children:"Staked"}),(0,x.jsx)("span",{children:(0,v.WI)(n.totalStaked)})]}),(0,x.jsxs)("div",{className:"row-wrap",children:[(0,x.jsx)("span",{children:"Earnings"}),(0,x.jsx)("span",{children:(0,v.WI)(n.totalEarnings)})]}),(0,x.jsxs)("div",{className:"row-wrap",children:[(0,x.jsx)("span",{children:"Bonus"}),(0,x.jsx)("span",{children:(0,v.WI)(n.bonus)})]}),(0,x.jsxs)("div",{className:"row-wrap",children:[(0,x.jsx)("span",{children:"Winnings"}),(0,x.jsx)("span",{className:j()({winnings:n.winnings>0,losses:n.winnings<0}),children:(0,v.WI)(n.winnings)})]})]})]},n._id)}))})]},n.title)}))}),(0,x.jsx)(g.o,{loading:r.loading})]})})}));a()}catch(Z){a(Z)}}))},1952:function(n,s,t){t.d(s,{o:function(){return g}});var a=t(1413),e=t(9439),i=t(3144),r=t(5671),o=t(2791),l=t(1382),d=t(2417),c=t(184),u=(0,i.Z)((function n(s){(0,r.Z)(this,n),this.loading=!1,this.content="",this.loading=s.loading,this.content=s.content})),g=function(n){var s=(0,o.useState)(new u(n)),t=(0,e.Z)(s,2),i=t[0],r=t[1];return(0,o.useEffect)((function(){r((function(s){return(0,a.Z)((0,a.Z)({},s),{},{loading:n.loading})}))}),[n.loading]),(0,c.jsx)(l.Z,(0,a.Z)((0,a.Z)({style:{position:"absolute",top:0,left:0,right:0,bottom:0}},i.loading?{active:!0}:{}),{},{children:(0,c.jsx)(d.Z,{})}))}},5630:function(){}}]);
//# sourceMappingURL=615.c9678f9f.chunk.js.map