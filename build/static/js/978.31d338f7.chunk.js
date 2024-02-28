"use strict";(self.webpackChunkplay_ab_web=self.webpackChunkplay_ab_web||[]).push([[978],{6978:function(e,n,t){t.a(e,(async function(e,l){try{t.r(n),t.d(n,{UsersComponent:function(){return A}});var a=t(1413),s=t(9439),i=t(2791),r=(t(2530),t(899)),d=t(2836),o=t(8900),c=t(7950),u=t(5978),h=t(7687),v=t(3656),m=t(7900),x=t(2426),g=t.n(x),p=t(7689),f=t(1952),j=t(1418),b=t.n(j),Z=t(99),k=t(1918),w=t(2115),y=t(1911),S=t(763),C=t(184),N=e([m]);m=(N.then?(await N)():N)[0];var A=(0,i.memo)((function(){var e,n,t,l=(0,v.h_)((function(){return m.b.getUsers()}),{withLoading:!1}),x=(0,s.Z)(l,2),j=x[0],N=x[1],A=(0,i.useMemo)((function(){return[]}),[]),I=JSON.stringify(window.location.href),J=(0,p.s0)(),W=(0,v.On)((function(e){A.length=0,e.checked=!0,A.push(e),J("@".concat(e._id),{relative:"route",replace:I.includes("@")})}),[J]),H=(0,i.useCallback)((function(e,n){e.stopPropagation();var t=JSON.parse(n.value),l=A.find((function(e){return e.build===t.build}));l?l.checked=n.checked:(t.checked=n.checked,A.push(t));var a=A.filter((function(e){return!0===e.checked})).map((function(e){return e._id})).join(",");J(0===(null===a||void 0===a?void 0:a.length)?"":"@".concat(a),{relative:"route",replace:I.includes("@")})}),[A,I,J]),_=null===(e=I.replaceAll('"',"").split("/").pop())||void 0===e?void 0:e.replace("@",""),B=(0,i.useMemo)((function(){var e,n;return(null===(e=j.data)||void 0===e||null===(n=e.filter((function(e){var n,t,l=!1===(null===(n=e.data)||void 0===n||null===(t=n.weekStatus)||void 0===t?void 0:t.done),a=g()(e.updatedAt||e.createdAt),s=g().duration(a.diff(Date.now())),i=Math.abs(s.asMinutes());return l&&i<30})))||void 0===n?void 0:n.length)||0}),[j.data]),M=(0,i.useCallback)((function(e,n){var t=(0,S.orderBy)(j.data,[function(e){return(0,v.hL)(e)===n.value},"data.weekStatus.betSummary.betSummary.totalStaked"],["desc","desc"]);N((function(e){return(0,a.Z)((0,a.Z)({},e),{},{data:t})}))}),[j.data]);return(0,C.jsxs)("div",{className:b()({"users-wrap":!0}),children:[(0,C.jsxs)(r.Z,{inverted:!0,children:[(0,C.jsxs)("div",{className:"ttl",children:[(0,C.jsxs)("div",{children:[(0,C.jsx)("span",{children:"Users"}),!!A.length&&(0,C.jsxs)("span",{children:["(",A.filter((function(e){return e.checked})).length,")"]})]}),(0,C.jsx)(d.Z,{size:"small",className:"pointer",onClick:j.reload,name:"refresh"})]}),(0,C.jsx)("hr",{}),(0,C.jsx)("div",{className:"tbl-wrap",children:(0,C.jsxs)(o.Z,{celled:!0,striped:!0,selectable:!0,inverted:!0,compact:!0,children:[(0,C.jsx)(o.Z.Header,{children:(0,C.jsxs)(o.Z.Row,{children:[(0,C.jsx)(o.Z.HeaderCell,{className:"multi-select",textAlign:"center",children:"#"}),(0,C.jsx)(o.Z.HeaderCell,{children:"App"}),(0,C.jsxs)(o.Z.HeaderCell,{textAlign:"center",className:"status",children:[(0,C.jsx)(c.Z,{text:"Status",closeOnChange:!1,onChange:M,options:[{key:v.J0.IsDone,value:v.J0.IsDone,text:"Done"},{key:v.J0.InProgress,value:v.J0.InProgress,text:"InProgress"},{key:v.J0.IsWaiting,value:v.J0.IsWaiting,text:"Waiting"}]}),(0,C.jsx)("br",{}),!!B&&"#".concat(B)]}),(0,C.jsx)(o.Z.HeaderCell,{children:"Version"}),(0,C.jsxs)(o.Z.HeaderCell,{className:"weekly-summary",textAlign:"center",children:["Weekly Summary",(0,C.jsx)("br",{}),"(Bonus + Earnings = Total)"]}),(0,C.jsx)(o.Z.HeaderCell,{className:"weekly-progress",textAlign:"center",children:"Weekly Progress"}),(0,C.jsx)(o.Z.HeaderCell,{textAlign:"center",className:"bets",children:"Bets"}),(0,C.jsx)(o.Z.HeaderCell,{className:"last-update",textAlign:"right",children:"Active"})]})}),(0,C.jsx)(o.Z.Body,{children:null===(n=j.data)||void 0===n?void 0:n.map((function(e,n){var t,l,a,s,i,r,d,c,m,x,p,f,S,N,I,J,B,M,D,O,P,U=(0,v.Sn)().weekStart,E=(0,v.hL)(e),L=(v.J0.IsWaiting,U.toISOString()!==(null===(t=e.data)||void 0===t||null===(l=t.weekStatus)||void 0===l?void 0:l.startDate)),R=g()(e.updatedAt||e.createdAt),z=g().duration(R.diff(Date.now())),T=Math.abs(z.asMinutes()),F=(null===(a=e.data)||void 0===a||null===(s=a.weekStatus)||void 0===s||null===(i=s.betSummary)||void 0===i?void 0:i.betSummary.totalStaked)||0,V=(null===(r=e.data)||void 0===r||null===(d=r.weekStatus)||void 0===d||null===(c=d.betSummary)||void 0===c?void 0:c.betSummary.totalEarnings)||0,q=(null===(m=e.data)||void 0===m||null===(x=m.weekStatus)||void 0===x||null===(p=x.betSummary)||void 0===p?void 0:p.betSummary.bonus)||0,G=(null===(f=e.data)||void 0===f||null===(S=f.weekStatus)||void 0===S||null===(N=S.betSummary)||void 0===N?void 0:N.betSummary.winnings)||0;L&&(F=0,V=0,q=0,G=0);var K=T>30?(0,v.Bb)(29):(0,v.Bb)(Math.floor(T)),Q=A.find((function(n){return n.build===e.build})),X=A.filter((function(e){return e.checked})).map((function(e){return e.build})),Y=(null===_||void 0===_?void 0:_.split(","))||[];return(0,C.jsxs)(o.Z.Row,{className:b()({selected:X.includes(e.build)||Y.includes(e._id)}),onClick:W(e),children:[(0,C.jsx)(o.Z.Cell,{selectable:!0,className:"multi-select",textAlign:"center",children:(0,C.jsx)(u.Z,{value:JSON.stringify(e),checked:!(null===Q||void 0===Q||!Q.checked),onChange:H})}),(0,C.jsx)(o.Z.Cell,{collapsing:!0,children:(0,C.jsx)("span",{children:e.build})}),(0,C.jsx)(o.Z.Cell,{collapsing:!0,textAlign:"center",className:"status",children:!j.loading&&[E].map((function(e,n){var t=y.Z,l="greenyellow";return e===v.J0.InProgress?(t=k.Z,l="#fbbd08"):e===v.J0.IsWaiting&&(t=w.Z,l="#ff5f5f"),(0,C.jsx)(Z.Z,{animation:t,size:25,autoplay:!0,strokeColor:l,loop:!0,speed:.4},n)}))}),(0,C.jsx)(o.Z.Cell,{collapsing:!0,children:null===(I=e.data)||void 0===I?void 0:I.version}),(0,C.jsx)(o.Z.Cell,{textAlign:"center",className:"week-summary",children:(0,C.jsxs)("div",{className:"week-summary-wrap",children:[(0,C.jsx)("span",{className:b()({win:q>0,lose:q<0}),children:(0,v.WI)(q)})," + ",(0,C.jsx)("span",{className:b()({win:V>0,lose:V<0}),children:(0,v.WI)(V)})," = ",(0,C.jsx)("span",{className:b()({win:G>0,lose:G<0}),children:(0,v.WI)(G)})]})}),(0,C.jsx)(o.Z.Cell,{textAlign:"right",className:"progress",children:(0,C.jsx)(h.Z,{indicating:!0,inverted:!0,success:!0===(null===(J=e.data)||void 0===J||null===(B=J.weekStatus)||void 0===B?void 0:B.done)&&0!==F,precision:0,value:Math.floor(F),progress:"percent",total:380,label:(0,v.WI)(F)})}),(0,C.jsx)(o.Z.Cell,{textAlign:"center",className:"bets",children:[{open:(null===(M=e.data.weekStatus)||void 0===M||null===(D=M.betSummary)||void 0===D?void 0:D.betSummary.openBets)||0,settled:(null===(O=e.data.weekStatus)||void 0===O||null===(P=O.betSummary)||void 0===P?void 0:P.betSummary.settledBets)||0}].map((function(e,n){var t=e.open,l=e.settled;return(0,C.jsxs)("div",{children:[(0,C.jsx)("span",{children:t}),(0,C.jsx)("span",{children:l})]},n)}))}),(0,C.jsx)(o.Z.Cell,{textAlign:"right",className:"last-login",children:(0,C.jsx)("span",{style:{color:K},children:R.fromNow()})})]},e._id)}))}),(0,C.jsx)(o.Z.Footer,{children:(0,C.jsx)(o.Z.Row,{children:(0,C.jsxs)(o.Z.HeaderCell,{colSpan:"100",children:["Total Users ",null===(t=j.data)||void 0===t?void 0:t.length]})})})]})}),(0,C.jsx)(f.o,{loading:j.loading})]}),(0,C.jsx)(p.j3,{})]})}));l()}catch(I){l(I)}}))},1952:function(e,n,t){t.d(n,{o:function(){return h}});var l=t(1413),a=t(9439),s=t(3144),i=t(5671),r=t(2791),d=t(1487),o=t(2417),c=t(184),u=(0,s.Z)((function e(n){(0,i.Z)(this,e),this.loading=!1,this.content="",this.loading=n.loading,this.content=n.content})),h=function(e){var n=(0,r.useState)(new u(e)),t=(0,a.Z)(n,2),s=t[0],i=t[1];return(0,r.useEffect)((function(){i((function(n){return(0,l.Z)((0,l.Z)({},n),{},{loading:e.loading})}))}),[e.loading]),(0,c.jsx)(d.Z,(0,l.Z)((0,l.Z)({style:{position:"absolute",top:0,left:0,right:0,bottom:0}},s.loading?{active:!0}:{}),{},{children:(0,c.jsx)(o.Z,{})}))}},2530:function(){}}]);
//# sourceMappingURL=978.31d338f7.chunk.js.map