"use strict";(self.webpackChunkplay_ab_web=self.webpackChunkplay_ab_web||[]).push([[978],{6978:function(e,l,a){a.a(e,(async function(e,t){try{a.r(l),a.d(l,{UsersComponent:function(){return m}});var n=a(2791),r=(a(2530),a(899)),s=a(2836),i=a(8672),c=a(3656),o=a(7900),d=a(2426),u=a.n(d),p=a(7689),v=a(1952),h=a(1694),f=a.n(h),Z=a(184),g=e([o]);o=(g.then?(await g)():g)[0];var m=(0,n.memo)((function(){var e,l,a=(0,c.h_)((function(){return o.b.getUsers()}),{withLoading:!1}),t=(0,p.s0)(),n=(0,c.On)((function(e){var l=JSON.stringify(window.location.href);t("@".concat(e._id),{relative:"route",replace:l.includes("@")})}),[]);return(0,Z.jsxs)("div",{className:"users-wrap",children:[(0,Z.jsxs)(r.Z,{inverted:!0,children:[(0,Z.jsxs)("div",{className:"row-wrap between ttl-wrap",children:[(0,Z.jsx)("span",{className:"ttl",children:"Users"}),(0,Z.jsx)(s.Z,{onClick:a.reload,name:"refresh"})]}),(0,Z.jsx)("hr",{}),(0,Z.jsxs)(i.Z,{celled:!0,striped:!0,selectable:!0,inverted:!0,children:[(0,Z.jsx)(i.Z.Header,{children:(0,Z.jsxs)(i.Z.Row,{children:[(0,Z.jsx)(i.Z.HeaderCell,{children:"Email"}),(0,Z.jsx)(i.Z.HeaderCell,{children:"Status"}),(0,Z.jsx)(i.Z.HeaderCell,{children:"Version"}),(0,Z.jsx)(i.Z.HeaderCell,{textAlign:"right",children:"Active"})]})}),(0,Z.jsx)(i.Z.Body,{children:null===(e=a.data)||void 0===e?void 0:e.map((function(e){var l,a,t,r,s,c,o;return(0,Z.jsxs)(i.Z.Row,{onClick:n(e),children:[(0,Z.jsx)(i.Z.Cell,{collapsing:!0,children:e._id}),(0,Z.jsx)(i.Z.Cell,{collapsing:!0,children:(0,Z.jsx)("span",{className:f()({status:!0,done:!0===(null===(l=e.data)||void 0===l||null===(a=l.weekStatus)||void 0===a?void 0:a.done),"in-progress":!1===(null===(t=e.data)||void 0===t||null===(r=t.weekStatus)||void 0===r?void 0:r.done),unknown:void 0===(null===(s=e.data)||void 0===s||null===(c=s.weekStatus)||void 0===c?void 0:c.done)})})}),(0,Z.jsx)(i.Z.Cell,{collapsing:!0,children:null===(o=e.data)||void 0===o?void 0:o.version}),(0,Z.jsx)(i.Z.Cell,{textAlign:"right",children:u()(e.updatedAt||e.createdAt).fromNow()})]},e._id)}))}),(0,Z.jsx)(i.Z.Footer,{children:(0,Z.jsx)(i.Z.Row,{children:(0,Z.jsxs)(i.Z.HeaderCell,{colSpan:"100",children:["Total Users ",null===(l=a.data)||void 0===l?void 0:l.length]})})})]}),(0,Z.jsx)(v.o,{loading:a.loading})]}),(0,Z.jsx)(p.j3,{})]})}));t()}catch(w){t(w)}}))},1952:function(e,l,a){a.d(l,{o:function(){return p}});var t=a(1413),n=a(9439),r=a(3144),s=a(5671),i=a(2791),c=a(1382),o=a(2417),d=a(184),u=(0,r.Z)((function e(l){(0,s.Z)(this,e),this.loading=!1,this.content="",this.loading=l.loading,this.content=l.content})),p=function(e){var l=(0,i.useState)(new u(e)),a=(0,n.Z)(l,2),r=a[0],s=a[1];return(0,i.useEffect)((function(){s((function(l){return(0,t.Z)((0,t.Z)({},l),{},{loading:e.loading})}))}),[e.loading]),(0,d.jsx)(c.Z,(0,t.Z)((0,t.Z)({style:{position:"absolute",top:0,left:0,right:0,bottom:0}},r.loading?{active:!0}:{}),{},{children:(0,d.jsx)(o.Z,{})}))}},8672:function(e,l,a){a.d(l,{Z:function(){return H}});var t=a(7462),n=a(6754),r=a(8035),s=a(5809),i=a(2104);var c=function(e,l){var a=-1,t=(0,i.Z)(e)?Array(e.length):[];return(0,s.Z)(e,(function(e,n,r){t[++a]=l(e,n,r)})),t},o=a(166);var d=function(e,l){return((0,o.Z)(e)?n.Z:c)(e,(0,r.Z)(l,3))},u=a(8182),p=a(2791),v=a(7826),h=a(6755),f=a(6246),Z=a(5831);function g(e){var l=e.children,a=e.className,n=(0,u.Z)(a),r=(0,h.Z)(g,e),s=(0,f.Z)(g,e);return p.createElement(s,(0,t.Z)({},r,{className:n}),l)}g.handledProps=["as","children","className"],g.defaultProps={as:"tbody"},g.propTypes={};var m=g,w=a(948),b=a(2836);function x(e){var l=e.active,a=e.children,n=e.className,r=e.collapsing,s=e.content,i=e.disabled,c=e.error,o=e.icon,d=e.negative,g=e.positive,m=e.selectable,w=e.singleLine,j=e.textAlign,G=e.verticalAlign,N=e.warning,k=e.width,A=(0,u.Z)((0,v.lG)(l,"active"),(0,v.lG)(r,"collapsing"),(0,v.lG)(i,"disabled"),(0,v.lG)(c,"error"),(0,v.lG)(d,"negative"),(0,v.lG)(g,"positive"),(0,v.lG)(m,"selectable"),(0,v.lG)(w,"single line"),(0,v.lG)(N,"warning"),(0,v.X4)(j),(0,v.Ok)(G),(0,v.H0)(k,"wide"),n),y=(0,h.Z)(x,e),C=(0,f.Z)(x,e);return Z.kK(a)?p.createElement(C,(0,t.Z)({},y,{className:A}),b.Z.create(o),s):p.createElement(C,(0,t.Z)({},y,{className:A}),a)}x.handledProps=["active","as","children","className","collapsing","content","disabled","error","icon","negative","positive","selectable","singleLine","textAlign","verticalAlign","warning","width"],x.defaultProps={as:"td"},x.propTypes={},x.create=(0,w.u5)(x,(function(e){return{content:e}}));var j=x;function G(e){var l=e.children,a=e.className,n=e.content,r=e.fullWidth,s=(0,u.Z)((0,v.lG)(r,"full-width"),a),i=(0,h.Z)(G,e),c=(0,f.Z)(G,e);return p.createElement(c,(0,t.Z)({},i,{className:s}),Z.kK(l)?n:l)}G.handledProps=["as","children","className","content","fullWidth"],G.defaultProps={as:"thead"},G.propTypes={};var N=G;function k(e){var l=e.as,a=(0,h.Z)(k,e);return p.createElement(N,(0,t.Z)({},a,{as:l}))}k.handledProps=["as"],k.propTypes={},k.defaultProps={as:"tfoot"};var A=k;function y(e){var l=e.as,a=e.className,n=e.sorted,r=(0,u.Z)((0,v.cD)(n,"sorted"),a),s=(0,h.Z)(y,e);return p.createElement(j,(0,t.Z)({},s,{as:l,className:r}))}y.handledProps=["as","className","sorted"],y.propTypes={},y.defaultProps={as:"th"};var C=y;function P(e){var l=e.active,a=e.cellAs,n=e.cells,r=e.children,s=e.className,i=e.disabled,c=e.error,o=e.negative,g=e.positive,m=e.textAlign,w=e.verticalAlign,b=e.warning,x=(0,u.Z)((0,v.lG)(l,"active"),(0,v.lG)(i,"disabled"),(0,v.lG)(c,"error"),(0,v.lG)(o,"negative"),(0,v.lG)(g,"positive"),(0,v.lG)(b,"warning"),(0,v.X4)(m),(0,v.Ok)(w),s),G=(0,h.Z)(P,e),N=(0,f.Z)(P,e);return Z.kK(r)?p.createElement(N,(0,t.Z)({},G,{className:x}),d(n,(function(e){return j.create(e,{defaultProps:{as:a}})}))):p.createElement(N,(0,t.Z)({},G,{className:x}),r)}P.handledProps=["active","as","cellAs","cells","children","className","disabled","error","negative","positive","textAlign","verticalAlign","warning"],P.defaultProps={as:"tr",cellAs:"td"},P.propTypes={},P.create=(0,w.u5)(P,(function(e){return{cells:e}}));var E=P;function R(e){var l=e.attached,a=e.basic,n=e.celled,r=e.children,s=e.className,i=e.collapsing,c=e.color,o=e.columns,g=e.compact,w=e.definition,b=e.fixed,x=e.footerRow,j=e.headerRow,G=e.headerRows,k=e.inverted,y=e.padded,C=e.renderBodyRow,P=e.selectable,H=e.singleLine,T=e.size,U=e.sortable,_=e.stackable,S=e.striped,L=e.structured,O=e.tableData,B=e.textAlign,K=e.unstackable,D=e.verticalAlign,X=(0,u.Z)("ui",c,T,(0,v.lG)(n,"celled"),(0,v.lG)(i,"collapsing"),(0,v.lG)(w,"definition"),(0,v.lG)(b,"fixed"),(0,v.lG)(k,"inverted"),(0,v.lG)(P,"selectable"),(0,v.lG)(H,"single line"),(0,v.lG)(U,"sortable"),(0,v.lG)(_,"stackable"),(0,v.lG)(S,"striped"),(0,v.lG)(L,"structured"),(0,v.lG)(K,"unstackable"),(0,v.sU)(l,"attached"),(0,v.sU)(a,"basic"),(0,v.sU)(g,"compact"),(0,v.sU)(y,"padded"),(0,v.X4)(B),(0,v.Ok)(D),(0,v.H0)(o,"column"),"table",s),z=(0,h.Z)(R,e),F=(0,f.Z)(R,e);if(!Z.kK(r))return p.createElement(F,(0,t.Z)({},z,{className:X}),r);var W={defaultProps:{cellAs:"th"}},J=(j||G)&&p.createElement(N,null,E.create(j,W),d(G,(function(e){return E.create(e,W)})));return p.createElement(F,(0,t.Z)({},z,{className:X}),J,p.createElement(m,null,C&&d(O,(function(e,l){return E.create(C(e,l))}))),x&&p.createElement(A,null,E.create(x)))}R.handledProps=["as","attached","basic","celled","children","className","collapsing","color","columns","compact","definition","fixed","footerRow","headerRow","headerRows","inverted","padded","renderBodyRow","selectable","singleLine","size","sortable","stackable","striped","structured","tableData","textAlign","unstackable","verticalAlign"],R.defaultProps={as:"table"},R.propTypes={},R.Body=m,R.Cell=j,R.Footer=A,R.Header=N,R.HeaderCell=C,R.Row=E;var H=R},2530:function(){}}]);
//# sourceMappingURL=978.1a770bec.chunk.js.map