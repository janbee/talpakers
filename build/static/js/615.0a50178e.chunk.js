"use strict";(self.webpackChunkplay_ab_web=self.webpackChunkplay_ab_web||[]).push([[615],{1615:function(e,n,s){s.a(e,(async function(e,t){try{s.r(n),s.d(n,{UserDetailsComponent:function(){return C}});var i=s(1413),a=s(9439),l=s(3144),r=s(5671),o=s(2791),d=(s(5630),s(1254)),c=s(1902),u=s(6249),h=s(899),v=s(2836),g=s(4599),m=s(3626),p=s(4863),x=s(6303),j=s(7900),f=s(1952),w=s(763),Z=s(2426),b=s.n(Z),D=s(7689),S=s(3656),y=s(1418),I=s.n(y),k=s(7335),N=s(3338),O=s(184),T=e([j,N]);[j,N]=T.then?(await T)():T;var A=(0,l.Z)((function e(){(0,r.Z)(this,e),this.loading=!0,this.list=[],this.yearTotalWinnings=0,this.yearTotalWithdrawals=0,this.userDetails=void 0,this.settingsOpen=!1})),C=(0,o.memo)((function(){var e,n,s,t,l,r,Z,y,T=null===(e=(0,D.TH)().pathname.split("/").pop())||void 0===e?void 0:e.replace("@",""),C=(0,o.useState)(new A),W=(0,a.Z)(C,2),B=W[0],M=W[1];(0,o.useEffect)((function(){M((function(e){return(0,i.Z)((0,i.Z)({},e),{},{loading:!0})}));var e=null===T||void 0===T?void 0:T.split(",");(0,k.D)([j.b.getBetSummary({email:{$in:e}}),j.b.getBonuses({email:{$in:e}}),j.b.getWithdrawals({email:{$in:e}}),j.b.getUser({email:{$in:e}})]).subscribe((function(n){var s=(0,a.Z)(n,4),t=s[0],l=s[1],r=s[2],o=s[3],d=null===l||void 0===l?void 0:l.filter((function(e){return"Approved"===e.TransactionStatus&&"Bonus"===e.TransactionType&&["IMMEDIATE BONUS","Bonus"].includes(e.PaymentMethodInfo)&&e.Amount>=10})),c=null===r||void 0===r?void 0:r.filter((function(e){return["Approved","Pending","Sending to Processor","In Process"].includes(e.TransactionStatus)})),u=Array.from(Array(b()().isoWeeksInYear()).keys()).map((function(n){var s=b()().format("YYYY"),i=b()(s).add(n,"weeks"),a=b()(i).format("MMM"),l=b()(i).format("M"),r=b()(i).startOf("week").add(1,"day").toISOString(),o=b()(i).endOf("week").toISOString(),u=new Date(r),h=new Date(o);u.setUTCHours(0,0,0,0),h.setUTCHours(23,59,59,999);var v=null===t||void 0===t?void 0:t.filter((function(e){return e.startDate===u.toISOString()&&e.endDate===h.toISOString()&&e.year===parseInt(s,10)})),g=null===e||void 0===e?void 0:e.map((function(e){return null===d||void 0===d?void 0:d.reverse().find((function(n){var s=b()(n.TransactionDateTime).subtract(7,"days");return s.isAfter(u)&&s.isBefore(h)&&n.email===e}))})).filter(Boolean),m=null===c||void 0===c?void 0:c.find((function(e){var n=new Date(e.TransactionDateTime.split("T")[0]);n.setUTCHours(0,0,0,0);var s=b()(n.toISOString());return s.isSameOrAfter(u)&&s.isSameOrBefore(h)})),p=0,x=(0,w.sumBy)(v,(function(e){return(null===e||void 0===e?void 0:e.betSummary.bonus)||0})),j=(0,w.sumBy)(v,(function(e){return(null===e||void 0===e?void 0:e.betSummary.totalStaked)||0})),f=(0,w.sumBy)(v,(function(e){return(null===e||void 0===e?void 0:e.betSummary.totalEarnings)||0})),Z=(0,w.sumBy)(v,(function(e){return(null===e||void 0===e?void 0:e.betSummary.winnings)||0})),D=(0,w.sumBy)(g,(function(e){return(null===e||void 0===e?void 0:e.Amount)||0}));return(null===g||void 0===g?void 0:g.length)!==(null===e||void 0===e?void 0:e.length)?D=x:Z=0,null!==g&&void 0!==g&&g.length&&null!==v&&void 0!==v&&v.length&&(p=D+(0,w.sumBy)(v,(function(e){return(null===e||void 0===e?void 0:e.betSummary.totalEarnings)||0}))),{_id:"".concat(a,"-").concat(n),mon:l+"-"+a,year:s,startDate:u.toISOString(),endDate:h.toISOString(),bonus:D||x||0,totalStaked:j,totalEarnings:f,winnings:p,approxWinnings:Z,loading:!1,fetch:0,title:a,withdrawal:m}})),h=(0,w.groupBy)(u,"mon"),v=Object.keys(h).map((function(e){return{title:e.split("-")[1],data:h[e]}})),g=(0,w.sumBy)(v,(function(e){return(0,w.sumBy)(e.data,"winnings")})),m=(0,w.sumBy)(v,(function(e){return(0,w.sumBy)(e.data,"withdrawal.Amount")}));M((function(e){return(0,i.Z)((0,i.Z)({},e),{},{loading:!1,yearTotalWinnings:g,yearTotalWithdrawals:m,list:v,userDetails:o})}))}))}),[T]);var P=(0,o.useCallback)((function(){console.log("gaga-------------------------------------",123123),M((function(e){return(0,i.Z)((0,i.Z)({},e),{},{settingsOpen:!B.settingsOpen})}))}),[B.settingsOpen]),_=((null===T||void 0===T?void 0:T.split(","))||[]).length>1;return(0,O.jsx)("div",{className:I()({"user-details-wrap":!0,"multi-users":_}),children:(0,O.jsxs)(d.Z,{children:[(0,O.jsx)(c.Z,{animation:"overlay",onHide:P,visible:B.settingsOpen,width:"wide",children:(0,O.jsx)(N.L,{config:{email:T},userDetails:null===(n=B.userDetails)||void 0===n?void 0:n[0]})}),(0,O.jsx)(u.Z,{children:(0,O.jsxs)(h.Z,{inverted:!0,children:[(0,O.jsxs)("div",{className:"ttl",children:[_?(0,O.jsx)("span",{children:"Multi Users View"}):(0,O.jsxs)("div",{className:"icon-wrap",children:[(0,O.jsx)(v.Z,{onClick:P,className:"pointer",name:"bars",size:"small"}),(0,O.jsx)("span",{children:T})]}),!_&&(0,O.jsx)("div",{className:"row-wrap between",children:(0,O.jsx)(g.Z,{on:"hover",basic:!0,trigger:(0,O.jsx)(v.Z,{name:"info circle",size:"small",className:"pointer"}),position:"bottom right",mouseLeaveDelay:6e4,children:(0,O.jsxs)(m.Z,{vertical:!0,children:[(0,O.jsx)(m.Z.Item,{header:!0,children:(0,O.jsxs)(p.Z,{as:"h3",children:["Year ",b()().format("YYYY")," Details"]})}),(0,O.jsxs)(m.Z.Item,{children:[(0,O.jsx)(p.Z,{as:"h4",children:"Current Balance"}),(0,O.jsx)("p",{children:(0,O.jsx)(x.Z,{color:"green",children:(0,S.WI)((null===(s=B.userDetails)||void 0===s||null===(t=s[0].data)||void 0===t||null===(l=t.userSession)||void 0===l?void 0:l.cash)||0)})})]}),(0,O.jsxs)(m.Z.Item,{children:[(0,O.jsx)(p.Z,{as:"h4",children:"Available Cashout"}),(0,O.jsx)("p",{children:(0,O.jsx)(x.Z,{color:"orange",children:(0,S.WI)((null===(r=B.userDetails)||void 0===r||null===(Z=r[0].data)||void 0===Z||null===(y=Z.userSession)||void 0===y?void 0:y.cashout)||0)})})]}),(0,O.jsxs)(m.Z.Item,{children:[(0,O.jsx)(p.Z,{as:"h4",children:"Total Earnings this year"}),(0,O.jsx)("p",{children:(0,O.jsx)(x.Z,{color:"purple",children:(0,S.WI)(B.yearTotalWinnings)})})]}),(0,O.jsxs)(m.Z.Item,{children:[(0,O.jsx)(p.Z,{as:"h4",children:"Total Cashout this year"}),(0,O.jsx)("p",{children:(0,O.jsxs)(x.Z,{color:"red",children:[" ",(0,S.WI)(Math.abs(B.yearTotalWithdrawals||0))]})})]})]})})})]}),(0,O.jsx)("hr",{}),(0,O.jsx)("div",{className:"user-details-content-wrap",children:B.list.map((function(e){var n=(0,w.sumBy)(e.data,"winnings");return(0,O.jsxs)("div",{className:"mon-wrap",children:[(0,O.jsxs)("div",{className:"ttl-wrap",children:[(0,O.jsx)(p.Z,{as:"h3",inverted:!0,children:e.title}),(0,O.jsx)(p.Z,{className:I()({winnings:n>0,losses:n<0}),as:"h4",inverted:!0,children:(0,S.WI)(n)})]}),(0,O.jsx)("hr",{}),(0,O.jsx)("div",{className:"week-wrap",children:e.data.map((function(e){return(0,O.jsxs)("div",{className:"week",children:[!!e.withdrawal&&!_&&(0,O.jsx)(O.Fragment,{children:[{Pending:"Pending"===e.withdrawal.TransactionStatus,Approved:"Approved"===e.withdrawal.TransactionStatus,Processing:["In Process","Sending to Processor"].includes(e.withdrawal.TransactionStatus)}].map((function(n,s){var t,i,a;return(0,O.jsxs)(g.Z,{on:"click",position:"top center",trigger:(0,O.jsx)("div",{className:I()({"has-withdrawal":!0,yellow:n.Pending,green:n.Approved,blue:n.Processing})}),flowing:!0,children:[(0,O.jsxs)(g.Z.Header,{children:["Withdrawal (",(0,O.jsx)("span",{className:I()({"yellow-light":n.Pending,"green-light":n.Approved,"blue-light":n.Processing}),children:null===(t=e.withdrawal)||void 0===t?void 0:t.TransactionStatus}),")"]}),(0,O.jsx)(g.Z.Content,{children:"".concat(null===(i=e.withdrawal)||void 0===i?void 0:i.PaymentMethodInfo," ").concat((0,S.WI)((null===(a=e.withdrawal)||void 0===a?void 0:a.Amount)||0))})]},s)}))}),(0,O.jsx)("div",{className:"week-date",children:(0,O.jsxs)("span",{children:[b()(e.startDate).utc().format("ddd DD")," -"," ",b()(e.endDate).utc().format("ddd DD")]})}),(0,O.jsxs)("div",{className:"week-content",children:[(0,O.jsxs)("div",{className:"row-wrap",children:[(0,O.jsx)("span",{children:"Staked"}),(0,O.jsx)("span",{children:(0,S.WI)(e.totalStaked)})]}),(0,O.jsxs)("div",{className:"row-wrap",children:[(0,O.jsx)("span",{children:"Earnings"}),(0,O.jsx)("span",{children:(0,S.WI)(e.totalEarnings)})]}),(0,O.jsxs)("div",{className:"row-wrap",children:[(0,O.jsx)("span",{children:"Bonus"}),(0,O.jsx)("span",{children:(0,S.WI)(e.bonus)})]}),e.approxWinnings>0&&(0,O.jsxs)("div",{className:"row-wrap",children:[(0,O.jsx)("span",{children:"Winnings"}),(0,O.jsx)(g.Z,{content:"Approximate Earnings.",position:"top center",trigger:(0,O.jsx)("span",{className:I()({approx:!0}),children:(0,S.WI)(e.approxWinnings)})})]})||(0,O.jsxs)("div",{className:"row-wrap",children:[(0,O.jsx)("span",{children:"Winnings"}),(0,O.jsx)("span",{className:I()({winnings:e.winnings>0,losses:e.winnings<0}),children:(0,S.WI)(e.winnings)})]})]})]},e._id)}))})]},e.title)}))}),(0,O.jsx)(f.o,{loading:B.loading})]})})]})})}));t()}catch(W){t(W)}}))},3338:function(e,n,s){s.a(e,(async function(e,t){try{s.d(n,{L:function(){return y}});var i=s(1413),a=s(9439),l=s(3144),r=s(5671),o=s(2791),d=s(1418),c=s.n(d),u=s(899),h=s(834),v=s(4834),g=s(5345),m=s(2836),p=s(7900),x=s(5027),j=s(763),f=s(2426),w=s.n(f),Z=s(1952),b=s(184),D=e([p]);p=(D.then?(await D)():D)[0];var S=(0,l.Z)((function e(n){(0,r.Z)(this,e),this.config={isOpen:!1,email:"",password:""},this.loading=!1,this.userDetails={data:{userSession:{TWO_FACTOR_AUTH:""}}},console.log("gaga-------------------------asdadasd------------",n),n.userDetails&&(Object.assign(this.userDetails,n.userDetails),console.log("gaga-----------------asdasdasdasd--------------------",this.userDetails))})),y=(0,o.memo)((function(e){var n,s,t,l,r,d,f,D,y,I,k,N,O,T,A=(0,o.useState)(new S(e)),C=(0,a.Z)(A,2),W=C[0],B=C[1];console.log("gaga---------state---------------------statestatestate-------",W),(0,o.useEffect)((function(){B((function(n){var s=(0,j.merge)(n,e);return(0,i.Z)((0,i.Z)({},n),s)}))}),[e]);var M=(0,o.useCallback)((function(){console.log("gaga----------------------state.config.email---------------",W.config),B((function(e){return(0,i.Z)((0,i.Z)({},e),{},{loading:!0})})),p.b.$RealmDB.login(W.config.email,W.config.password).pipe((0,x.z)((function(){return console.log("gaga------------------------------------to update",JSON.stringify((0,i.Z)((0,i.Z)({},W.userDetails),{},{_id:W.config.email}),null,2)),p.b.upsertUserData((0,i.Z)((0,i.Z)({},W.userDetails),{},{_id:W.config.email}))}))).subscribe((function(){B((function(e){return(0,i.Z)((0,i.Z)({},e),{},{loading:!1})}))}))}),[W.config]),P=(0,o.useCallback)((function(e){console.log("gaga-------------------------------------"),B((function(n){var s={},t=e.target.getAttribute("data-value");(0,j.set)(s,t,e.target.value);var a=(0,j.merge)(n,s);return console.log("gaga-------------------------------------",a),(0,i.Z)((0,i.Z)({},n),a)}))}),[]),_=(0,o.useCallback)((function(e,n){e.preventDefault();var s=n["data-value"];Object.keys(s).forEach((function(e){var n=(0,j.get)(W.userDetails,e),t=s[e];"updatedAt"===e&&n?(delete W.userDetails.updatedAt,Object.assign(W.userDetails,(0,j.omit)(W.userDetails,e))):n!==t?(0,j.set)(W.userDetails,e,s[e]):Object.assign(W.userDetails,(0,j.omit)(W.userDetails,e))})),B((function(e){return(0,i.Z)((0,i.Z)({},e),{},{userDetails:W.userDetails})}))}),[W.userDetails]),E=(0,o.useCallback)((function(e){e.preventDefault(),e.target.blur()}),[]);return(0,b.jsxs)("div",{className:c()({"settings-wrap":!0,open:W.config.isOpen}),children:[(0,b.jsxs)(u.Z,{inverted:!0,children:[(0,b.jsx)("span",{className:"ttl",children:"Settings"}),(0,b.jsx)("hr",{}),(0,b.jsxs)("div",{className:"content",children:[(0,b.jsxs)("div",{className:"content-item",children:[(0,b.jsx)("span",{children:"For Account"}),(0,b.jsx)("span",{children:W.config.email})]}),(0,b.jsxs)("div",{className:"content-item",children:[(0,b.jsx)("span",{children:"Change Time"}),(0,b.jsx)(h.Z,{inverted:!0,color:"green",size:"small",circular:!0,active:!!W.userDetails.updatedAt,"data-value":{updatedAt:w()().subtract(1,"hour").toDate()},onClick:_,onMouseOut:E,children:"Yes"})]}),(0,b.jsxs)("div",{className:"content-item",children:[(0,b.jsx)("span",{children:"Set Bet"}),(0,b.jsxs)("div",{className:"btn-wrap",children:[(0,b.jsx)(h.Z,{tabIndex:-1,inverted:!0,color:"orange",size:"small",circular:!0,"data-value":{"data.settings.bet":"5"},active:"5"===(null===(n=W.userDetails.data)||void 0===n||null===(s=n.settings)||void 0===s?void 0:s.bet),onClick:_,onMouseOut:E,children:"5"}),(0,b.jsx)(h.Z,{tabIndex:-1,inverted:!0,color:"yellow",size:"small",circular:!0,"data-value":{"data.settings.bet":"15"},active:"15"===(null===(t=W.userDetails.data)||void 0===t||null===(l=t.settings)||void 0===l?void 0:l.bet),onClick:_,onMouseOut:E,children:"15"}),(0,b.jsx)(h.Z,{tabIndex:-1,inverted:!0,color:"green",size:"small",circular:!0,active:"25"===(null===(r=W.userDetails.data)||void 0===r||null===(d=r.settings)||void 0===d?void 0:d.bet),"data-value":{"data.settings.bet":"25"},onClick:_,onMouseOut:E,children:"25"})]})]}),(0,b.jsxs)("div",{className:"content-item",children:[(0,b.jsx)("span",{children:"Set Done"}),(0,b.jsxs)("div",{className:"btn-wrap",children:[(0,b.jsx)(h.Z,{tabIndex:-1,inverted:!0,color:"red",size:"small",circular:!0,"data-value":{"data.weekStatus.done":!1},active:!1===(null===(f=W.userDetails.data)||void 0===f||null===(D=f.weekStatus)||void 0===D?void 0:D.done),onClick:_,onMouseOut:E,children:"false"}),(0,b.jsx)(h.Z,{tabIndex:-1,inverted:!0,color:"green",size:"small",circular:!0,"data-value":{"data.weekStatus.done":!0},active:!0===(null===(y=W.userDetails.data)||void 0===y||null===(I=y.weekStatus)||void 0===I?void 0:I.done),onClick:_,onMouseOut:E,children:"true"})]})]}),(0,b.jsxs)("div",{className:"content-item",children:[(0,b.jsx)("span",{children:"Set Auto Login"}),(0,b.jsxs)("div",{className:"btn-wrap",children:[(0,b.jsx)(h.Z,{tabIndex:-1,inverted:!0,color:"red",size:"small",circular:!0,"data-value":{"data.settings.electronAutoLogin":!1},active:!1===(null===(k=W.userDetails.data)||void 0===k||null===(N=k.settings)||void 0===N?void 0:N.electronAutoLogin),onClick:_,onMouseOut:E,children:"false"}),(0,b.jsx)(h.Z,{tabIndex:-1,inverted:!0,color:"green",size:"small",circular:!0,"data-value":{"data.settings.electronAutoLogin":!0},active:!0===(null===(O=W.userDetails.data)||void 0===O||null===(T=O.settings)||void 0===T?void 0:T.electronAutoLogin),onClick:_,onMouseOut:E,children:"true"})]})]}),(0,b.jsxs)("div",{className:"content-item",children:[(0,b.jsx)("span",{children:"Set Two Factor Auth"}),(0,b.jsx)("div",{className:"btn-wrap",children:(0,b.jsx)(v.Z,{placeholder:"Two factor auth",children:(0,b.jsx)("input",{"data-value":"userDetails.data.userSession.TWO_FACTOR_AUTH",value:W.userDetails.data.userSession.TWO_FACTOR_AUTH,onInput:P})})})]})]}),(0,b.jsx)("hr",{}),(0,b.jsxs)(g.Z,{onSubmit:M,className:"footer",children:[(0,b.jsxs)(v.Z,{iconPosition:"left",placeholder:"Password",children:[(0,b.jsx)(m.Z,{name:"lock"}),(0,b.jsx)("input",{placeholder:"Password","data-value":"config.password",value:W.config.password,onInput:P})]}),(0,b.jsx)(h.Z,{type:"submit",children:"Update"})]})]}),(0,b.jsx)(Z.o,{loading:W.loading})]})}));t()}catch(I){t(I)}}))},1952:function(e,n,s){s.d(n,{o:function(){return h}});var t=s(1413),i=s(9439),a=s(3144),l=s(5671),r=s(2791),o=s(1487),d=s(2417),c=s(184),u=(0,a.Z)((function e(n){(0,l.Z)(this,e),this.loading=!1,this.content="",this.loading=n.loading,this.content=n.content})),h=function(e){var n=(0,r.useState)(new u(e)),s=(0,i.Z)(n,2),a=s[0],l=s[1];return(0,r.useEffect)((function(){l((function(n){return(0,t.Z)((0,t.Z)({},n),{},{loading:e.loading})}))}),[e.loading]),(0,c.jsx)(o.Z,(0,t.Z)((0,t.Z)({style:{position:"absolute",top:0,left:0,right:0,bottom:0}},a.loading?{active:!0}:{}),{},{children:(0,c.jsx)(d.Z,{})}))}},5630:function(){}}]);
//# sourceMappingURL=615.0a50178e.chunk.js.map