"use strict";(self.webpackChunkplay_ab_web=self.webpackChunkplay_ab_web||[]).push([[978],{6978:function(e,t,a){a.a(e,(async function(e,l){try{a.r(t),a.d(t,{UsersComponent:function(){return m}});var n=a(2791),r=(a(2530),a(899)),s=a(2836),i=a(8672),o=a(3656),c=a(7900),d=a(2426),u=a.n(d),v=a(7689),p=a(1952),g=a(1694),h=a.n(g),f=a(184),Z=e([c]);c=(Z.then?(await Z)():Z)[0];var m=(0,n.memo)((function(){var e,t,a=(0,o.h_)((function(){return c.b.getUsers()}),{withLoading:!1}),l=(0,v.s0)(),n=(0,o.On)((function(e){var t=JSON.stringify(window.location.href);l("@".concat(e._id),{relative:"route",replace:t.includes("@")})}),[]);return(0,f.jsxs)("div",{className:"users-wrap",children:[(0,f.jsxs)(r.Z,{inverted:!0,children:[(0,f.jsxs)("div",{className:"row-wrap between ttl-wrap",children:[(0,f.jsx)("span",{className:"ttl",children:"Users"}),(0,f.jsx)(s.Z,{onClick:a.reload,name:"refresh"})]}),(0,f.jsx)("hr",{}),(0,f.jsxs)(i.Z,{celled:!0,striped:!0,selectable:!0,inverted:!0,children:[(0,f.jsx)(i.Z.Header,{children:(0,f.jsxs)(i.Z.Row,{children:[(0,f.jsx)(i.Z.HeaderCell,{children:"Email"}),(0,f.jsx)(i.Z.HeaderCell,{children:"Status"}),(0,f.jsx)(i.Z.HeaderCell,{children:"Version"}),(0,f.jsx)(i.Z.HeaderCell,{textAlign:"right",children:"Active"})]})}),(0,f.jsx)(i.Z.Body,{children:null===(e=a.data)||void 0===e?void 0:e.map((function(e){var t,a,l,r,s,o,c,d,v,p,g,Z=new Date((new Date).getTime()-6e4*(new Date).getTimezoneOffset()),m=Z.getDay(),w=0===m?6:m-1,b=new Date(new Date(Z).setDate(Z.getDate()-w)),x=new Date(new Date(b).setDate(b.getDate()+6));return b=new Date(b.getTime()-6e4*(new Date).getTimezoneOffset()),x=new Date(x.getTime()-6e4*(new Date).getTimezoneOffset()),b.setUTCHours(0,0,0,0),x.setUTCHours(23,59,59,999),console.log("gaga-----------------------asdasd--------------",b.toISOString()+"!=="+(null===(t=e.data)||void 0===t||null===(a=t.weekStatus)||void 0===a?void 0:a.startDate)),(0,f.jsxs)(i.Z.Row,{onClick:n(e),children:[(0,f.jsx)(i.Z.Cell,{collapsing:!0,children:e._id}),(0,f.jsx)(i.Z.Cell,{collapsing:!0,children:(0,f.jsx)("span",{className:h()({status:!0,done:!0===(null===(l=e.data)||void 0===l||null===(r=l.weekStatus)||void 0===r?void 0:r.done),"in-progress":!1===(null===(s=e.data)||void 0===s||null===(o=s.weekStatus)||void 0===o?void 0:o.done),unknown:void 0===(null===(c=e.data)||void 0===c||null===(d=c.weekStatus)||void 0===d?void 0:d.done),waiting:b.toISOString()!==(null===(v=e.data)||void 0===v||null===(p=v.weekStatus)||void 0===p?void 0:p.startDate)})})}),(0,f.jsx)(i.Z.Cell,{collapsing:!0,children:null===(g=e.data)||void 0===g?void 0:g.version}),(0,f.jsx)(i.Z.Cell,{textAlign:"right",children:u()(e.updatedAt||e.createdAt).fromNow()})]},e._id)}))}),(0,f.jsx)(i.Z.Footer,{children:(0,f.jsx)(i.Z.Row,{children:(0,f.jsxs)(i.Z.HeaderCell,{colSpan:"100",children:["Total Users ",null===(t=a.data)||void 0===t?void 0:t.length]})})})]}),(0,f.jsx)(p.o,{loading:a.loading})]}),(0,f.jsx)(v.j3,{})]})}));l()}catch(w){l(w)}}))},1952:function(e,t,a){a.d(t,{o:function(){return v}});var l=a(1413),n=a(9439),r=a(3144),s=a(5671),i=a(2791),o=a(1382),c=a(2417),d=a(184),u=(0,r.Z)((function e(t){(0,s.Z)(this,e),this.loading=!1,this.content="",this.loading=t.loading,this.content=t.content})),v=function(e){var t=(0,i.useState)(new u(e)),a=(0,n.Z)(t,2),r=a[0],s=a[1];return(0,i.useEffect)((function(){s((function(t){return(0,l.Z)((0,l.Z)({},t),{},{loading:e.loading})}))}),[e.loading]),(0,d.jsx)(o.Z,(0,l.Z)((0,l.Z)({style:{position:"absolute",top:0,left:0,right:0,bottom:0}},r.loading?{active:!0}:{}),{},{children:(0,d.jsx)(c.Z,{})}))}},8672:function(e,t,a){a.d(t,{Z:function(){return E}});var l=a(7462),n=a(6754),r=a(8035),s=a(5809),i=a(2104);var o=function(e,t){var a=-1,l=(0,i.Z)(e)?Array(e.length):[];return(0,s.Z)(e,(function(e,n,r){l[++a]=t(e,n,r)})),l},c=a(166);var d=function(e,t){return((0,c.Z)(e)?n.Z:o)(e,(0,r.Z)(t,3))},u=a(8182),v=a(2791),p=a(7826),g=a(6755),h=a(6246),f=a(5831);function Z(e){var t=e.children,a=e.className,n=(0,u.Z)(a),r=(0,g.Z)(Z,e),s=(0,h.Z)(Z,e);return v.createElement(s,(0,l.Z)({},r,{className:n}),t)}Z.handledProps=["as","children","className"],Z.defaultProps={as:"tbody"},Z.propTypes={};var m=Z,w=a(948),b=a(2836);function x(e){var t=e.active,a=e.children,n=e.className,r=e.collapsing,s=e.content,i=e.disabled,o=e.error,c=e.icon,d=e.negative,Z=e.positive,m=e.selectable,w=e.singleLine,j=e.textAlign,G=e.verticalAlign,N=e.warning,k=e.width,A=(0,u.Z)((0,p.lG)(t,"active"),(0,p.lG)(r,"collapsing"),(0,p.lG)(i,"disabled"),(0,p.lG)(o,"error"),(0,p.lG)(d,"negative"),(0,p.lG)(Z,"positive"),(0,p.lG)(m,"selectable"),(0,p.lG)(w,"single line"),(0,p.lG)(N,"warning"),(0,p.X4)(j),(0,p.Ok)(G),(0,p.H0)(k,"wide"),n),D=(0,g.Z)(x,e),y=(0,h.Z)(x,e);return f.kK(a)?v.createElement(y,(0,l.Z)({},D,{className:A}),b.Z.create(c),s):v.createElement(y,(0,l.Z)({},D,{className:A}),a)}x.handledProps=["active","as","children","className","collapsing","content","disabled","error","icon","negative","positive","selectable","singleLine","textAlign","verticalAlign","warning","width"],x.defaultProps={as:"td"},x.propTypes={},x.create=(0,w.u5)(x,(function(e){return{content:e}}));var j=x;function G(e){var t=e.children,a=e.className,n=e.content,r=e.fullWidth,s=(0,u.Z)((0,p.lG)(r,"full-width"),a),i=(0,g.Z)(G,e),o=(0,h.Z)(G,e);return v.createElement(o,(0,l.Z)({},i,{className:s}),f.kK(t)?n:t)}G.handledProps=["as","children","className","content","fullWidth"],G.defaultProps={as:"thead"},G.propTypes={};var N=G;function k(e){var t=e.as,a=(0,g.Z)(k,e);return v.createElement(N,(0,l.Z)({},a,{as:t}))}k.handledProps=["as"],k.propTypes={},k.defaultProps={as:"tfoot"};var A=k;function D(e){var t=e.as,a=e.className,n=e.sorted,r=(0,u.Z)((0,p.cD)(n,"sorted"),a),s=(0,g.Z)(D,e);return v.createElement(j,(0,l.Z)({},s,{as:t,className:r}))}D.handledProps=["as","className","sorted"],D.propTypes={},D.defaultProps={as:"th"};var y=D;function C(e){var t=e.active,a=e.cellAs,n=e.cells,r=e.children,s=e.className,i=e.disabled,o=e.error,c=e.negative,Z=e.positive,m=e.textAlign,w=e.verticalAlign,b=e.warning,x=(0,u.Z)((0,p.lG)(t,"active"),(0,p.lG)(i,"disabled"),(0,p.lG)(o,"error"),(0,p.lG)(c,"negative"),(0,p.lG)(Z,"positive"),(0,p.lG)(b,"warning"),(0,p.X4)(m),(0,p.Ok)(w),s),G=(0,g.Z)(C,e),N=(0,h.Z)(C,e);return f.kK(r)?v.createElement(N,(0,l.Z)({},G,{className:x}),d(n,(function(e){return j.create(e,{defaultProps:{as:a}})}))):v.createElement(N,(0,l.Z)({},G,{className:x}),r)}C.handledProps=["active","as","cellAs","cells","children","className","disabled","error","negative","positive","textAlign","verticalAlign","warning"],C.defaultProps={as:"tr",cellAs:"td"},C.propTypes={},C.create=(0,w.u5)(C,(function(e){return{cells:e}}));var P=C;function T(e){var t=e.attached,a=e.basic,n=e.celled,r=e.children,s=e.className,i=e.collapsing,o=e.color,c=e.columns,Z=e.compact,w=e.definition,b=e.fixed,x=e.footerRow,j=e.headerRow,G=e.headerRows,k=e.inverted,D=e.padded,y=e.renderBodyRow,C=e.selectable,E=e.singleLine,S=e.size,H=e.sortable,R=e.stackable,O=e.striped,U=e.structured,_=e.tableData,z=e.textAlign,L=e.unstackable,B=e.verticalAlign,K=(0,u.Z)("ui",o,S,(0,p.lG)(n,"celled"),(0,p.lG)(i,"collapsing"),(0,p.lG)(w,"definition"),(0,p.lG)(b,"fixed"),(0,p.lG)(k,"inverted"),(0,p.lG)(C,"selectable"),(0,p.lG)(E,"single line"),(0,p.lG)(H,"sortable"),(0,p.lG)(R,"stackable"),(0,p.lG)(O,"striped"),(0,p.lG)(U,"structured"),(0,p.lG)(L,"unstackable"),(0,p.sU)(t,"attached"),(0,p.sU)(a,"basic"),(0,p.sU)(Z,"compact"),(0,p.sU)(D,"padded"),(0,p.X4)(z),(0,p.Ok)(B),(0,p.H0)(c,"column"),"table",s),X=(0,g.Z)(T,e),F=(0,h.Z)(T,e);if(!f.kK(r))return v.createElement(F,(0,l.Z)({},X,{className:K}),r);var I={defaultProps:{cellAs:"th"}},W=(j||G)&&v.createElement(N,null,P.create(j,I),d(G,(function(e){return P.create(e,I)})));return v.createElement(F,(0,l.Z)({},X,{className:K}),W,v.createElement(m,null,y&&d(_,(function(e,t){return P.create(y(e,t))}))),x&&v.createElement(A,null,P.create(x)))}T.handledProps=["as","attached","basic","celled","children","className","collapsing","color","columns","compact","definition","fixed","footerRow","headerRow","headerRows","inverted","padded","renderBodyRow","selectable","singleLine","size","sortable","stackable","striped","structured","tableData","textAlign","unstackable","verticalAlign"],T.defaultProps={as:"table"},T.propTypes={},T.Body=m,T.Cell=j,T.Footer=A,T.Header=N,T.HeaderCell=y,T.Row=P;var E=T},2530:function(){}}]);
//# sourceMappingURL=978.94731617.chunk.js.map