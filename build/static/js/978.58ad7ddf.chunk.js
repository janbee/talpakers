"use strict";(self.webpackChunkplay_ab_web=self.webpackChunkplay_ab_web||[]).push([[978],{6978:function(e,t,n){n.a(e,(async function(e,a){try{n.r(t),n.d(t,{UsersComponent:function(){return b}});var l=n(2791),i=(n(2530),n(899)),r=n(2836),s=n(8900),c=n(5978),o=n(3656),d=n(7900),u=n(2426),p=n.n(u),h=n(7689),v=n(1952),f=n(1418),m=n.n(f),g=n(184),Z=e([d]);d=(Z.then?(await Z)():Z)[0];var b=(0,l.memo)((function(){var e,t,n,a=(0,o.h_)((function(){return d.b.getUsers()}),{withLoading:!1}),u=(0,l.useMemo)((function(){return[]}),[]),f=JSON.stringify(window.location.href),Z=(0,h.s0)(),b=(0,o.On)((function(e){u.length=0,e.checked=!0,u.push(e),Z("@".concat(e._id),{relative:"route",replace:f.includes("@")})}),[Z]),k=(0,l.useCallback)((function(e,t){e.stopPropagation();var n=JSON.parse(t.value),a=u.find((function(e){return e.build===n.build}));a?a.checked=t.checked:(n.checked=t.checked,u.push(n));var l=u.filter((function(e){return!0===e.checked})).map((function(e){return e._id})).join(",");Z(0===(null===l||void 0===l?void 0:l.length)?"":"@".concat(l),{relative:"route",replace:f.includes("@")})}),[]),w=null===(e=f.replaceAll('"',"").split("/").pop())||void 0===e?void 0:e.replace("@","");return(0,g.jsxs)("div",{className:m()({"users-wrap":!0}),children:[(0,g.jsxs)(i.Z,{inverted:!0,children:[(0,g.jsxs)("div",{className:"row-wrap between ttl-wrap",children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("span",{className:"ttl",children:"Users"}),!!u.length&&(0,g.jsxs)("span",{className:"ttl",children:["(",u.filter((function(e){return e.checked})).length,")"]})]}),(0,g.jsx)(r.Z,{onClick:a.reload,name:"refresh"})]}),(0,g.jsx)("hr",{}),(0,g.jsx)("div",{className:"tbl-wrap",children:(0,g.jsxs)(s.Z,{celled:!0,striped:!0,selectable:!0,inverted:!0,children:[(0,g.jsx)(s.Z.Header,{children:(0,g.jsxs)(s.Z.Row,{children:[(0,g.jsx)(s.Z.HeaderCell,{className:"multi-select",textAlign:"center",children:"#"}),(0,g.jsx)(s.Z.HeaderCell,{children:"App"}),(0,g.jsx)(s.Z.HeaderCell,{children:"Status"}),(0,g.jsx)(s.Z.HeaderCell,{children:"Version"}),(0,g.jsx)(s.Z.HeaderCell,{textAlign:"center",width:1,children:"Week Winnings"}),(0,g.jsx)(s.Z.HeaderCell,{textAlign:"right",children:"Active"})]})}),(0,g.jsx)(s.Z.Body,{children:null===(t=a.data)||void 0===t?void 0:t.map((function(e,t){var n,a,l,i,r,d,h,v,f,Z,x,C,j,N,G,y=6e4*(new Date).getTimezoneOffset(),A=new Date((new Date).getTime()-y);A.setUTCHours(0,0,0,0);var R=A.getDay(),D=new Date(A);D.setUTCHours(0,0,0,0),D.setDate(A.getDate()-R);var P=new Date(D);P.setUTCHours(0,0,0,0);var T=new Date(P);T.setUTCHours(0,0,0,0),T.setDate(P.getDate()+6),new Date(T).setUTCHours(23,59,59,999);var E=!1===(null===(n=e.data)||void 0===n||null===(a=n.weekStatus)||void 0===a?void 0:a.done),U=p()(e.updatedAt||e.createdAt),M=p().duration(U.diff(Date.now())),H=Math.abs(M.asMinutes()),S=!1;E&&H>=30&&(S=!0);var O=H>30?(0,o.Bb)(29):(0,o.Bb)(Math.floor(H)),I=u.find((function(t){return t.build===e.build})),_=u.filter((function(e){return e.checked})).map((function(e){return e.build})),F=(null===w||void 0===w?void 0:w.split(","))||[];return(0,g.jsxs)(s.Z.Row,{className:m()({selected:_.includes(e.build)||F.includes(e._id)}),onClick:b(e),children:[(0,g.jsx)(s.Z.Cell,{selectable:!0,className:"multi-select",textAlign:"center",children:(0,g.jsx)(c.Z,{value:JSON.stringify(e),checked:!(null===I||void 0===I||!I.checked),onChange:k})}),(0,g.jsx)(s.Z.Cell,{collapsing:!0,children:(0,g.jsx)("span",{onClick:function(e){},children:e.build})}),(0,g.jsx)(s.Z.Cell,{collapsing:!0,children:(0,g.jsx)("span",{className:m()({status:!0,done:!0===(null===(l=e.data)||void 0===l||null===(i=l.weekStatus)||void 0===i?void 0:i.done),"in-progress":E,unknown:void 0===(null===(r=e.data)||void 0===r||null===(d=r.weekStatus)||void 0===d?void 0:d.done),waiting:P.toISOString()!==(null===(h=e.data)||void 0===h||null===(v=h.weekStatus)||void 0===v?void 0:v.startDate)||S})})}),(0,g.jsx)(s.Z.Cell,{collapsing:!0,children:null===(f=e.data)||void 0===f?void 0:f.version}),(0,g.jsx)(s.Z.Cell,{textAlign:"center",children:(0,g.jsx)("span",{className:m()({win:((null===(Z=e.data)||void 0===Z||null===(x=Z.weekStatus)||void 0===x?void 0:x.winnings)||0)>0,lose:((null===(C=e.data)||void 0===C||null===(j=C.weekStatus)||void 0===j?void 0:j.winnings)||0)<0}),children:(0,o.WI)((null===(N=e.data)||void 0===N||null===(G=N.weekStatus)||void 0===G?void 0:G.winnings)||0)})}),(0,g.jsx)(s.Z.Cell,{textAlign:"right",children:(0,g.jsx)("span",{style:{color:O},children:U.fromNow()})})]},e._id)}))}),(0,g.jsx)(s.Z.Footer,{children:(0,g.jsx)(s.Z.Row,{children:(0,g.jsxs)(s.Z.HeaderCell,{colSpan:"100",children:["Total Users ",null===(n=a.data)||void 0===n?void 0:n.length]})})})]})}),(0,g.jsx)(v.o,{loading:a.loading})]}),(0,g.jsx)(h.j3,{})]})}));a()}catch(k){a(k)}}))},1952:function(e,t,n){n.d(t,{o:function(){return p}});var a=n(1413),l=n(9439),i=n(3144),r=n(5671),s=n(2791),c=n(1487),o=n(2417),d=n(184),u=(0,i.Z)((function e(t){(0,r.Z)(this,e),this.loading=!1,this.content="",this.loading=t.loading,this.content=t.content})),p=function(e){var t=(0,s.useState)(new u(e)),n=(0,l.Z)(t,2),i=n[0],r=n[1];return(0,s.useEffect)((function(){r((function(t){return(0,a.Z)((0,a.Z)({},t),{},{loading:e.loading})}))}),[e.loading]),(0,d.jsx)(c.Z,(0,a.Z)((0,a.Z)({style:{position:"absolute",top:0,left:0,right:0,bottom:0}},i.loading?{active:!0}:{}),{},{children:(0,d.jsx)(o.Z,{})}))}},8900:function(e,t,n){n.d(t,{Z:function(){return G}});var a=n(7462),l=n(4210),i=n(8182),r=n(2791),s=n(7826),c=n(6755),o=n(6246),d=n(5831);function u(e){var t=e.children,n=e.className,l=(0,i.Z)(n),s=(0,c.Z)(u,e),d=(0,o.Z)(u,e);return r.createElement(d,(0,a.Z)({},s,{className:l}),t)}u.handledProps=["as","children","className"],u.defaultProps={as:"tbody"},u.propTypes={};var p=u,h=n(1126),v=n(2836);function f(e){var t=e.active,n=e.children,l=e.className,u=e.collapsing,p=e.content,h=e.disabled,m=e.error,g=e.icon,Z=e.negative,b=e.positive,k=e.selectable,w=e.singleLine,x=e.textAlign,C=e.verticalAlign,j=e.warning,N=e.width,G=(0,i.Z)((0,s.lG)(t,"active"),(0,s.lG)(u,"collapsing"),(0,s.lG)(h,"disabled"),(0,s.lG)(m,"error"),(0,s.lG)(Z,"negative"),(0,s.lG)(b,"positive"),(0,s.lG)(k,"selectable"),(0,s.lG)(w,"single line"),(0,s.lG)(j,"warning"),(0,s.X4)(x),(0,s.Ok)(C),(0,s.H0)(N,"wide"),l),y=(0,c.Z)(f,e),A=(0,o.Z)(f,e);return d.kK(n)?r.createElement(A,(0,a.Z)({},y,{className:G}),v.Z.create(g),p):r.createElement(A,(0,a.Z)({},y,{className:G}),n)}f.handledProps=["active","as","children","className","collapsing","content","disabled","error","icon","negative","positive","selectable","singleLine","textAlign","verticalAlign","warning","width"],f.defaultProps={as:"td"},f.propTypes={},f.create=(0,h.u5)(f,(function(e){return{content:e}}));var m=f;function g(e){var t=e.children,n=e.className,l=e.content,u=e.fullWidth,p=(0,i.Z)((0,s.lG)(u,"full-width"),n),h=(0,c.Z)(g,e),v=(0,o.Z)(g,e);return r.createElement(v,(0,a.Z)({},h,{className:p}),d.kK(t)?l:t)}g.handledProps=["as","children","className","content","fullWidth"],g.defaultProps={as:"thead"},g.propTypes={};var Z=g;function b(e){var t=e.as,n=(0,c.Z)(b,e);return r.createElement(Z,(0,a.Z)({},n,{as:t}))}b.handledProps=["as"],b.propTypes={},b.defaultProps={as:"tfoot"};var k=b;function w(e){var t=e.as,n=e.className,l=e.sorted,o=(0,i.Z)((0,s.cD)(l,"sorted"),n),d=(0,c.Z)(w,e);return r.createElement(m,(0,a.Z)({},d,{as:t,className:o}))}w.handledProps=["as","className","sorted"],w.propTypes={},w.defaultProps={as:"th"};var x=w;function C(e){var t=e.active,n=e.cellAs,u=e.cells,p=e.children,h=e.className,v=e.disabled,f=e.error,g=e.negative,Z=e.positive,b=e.textAlign,k=e.verticalAlign,w=e.warning,x=(0,i.Z)((0,s.lG)(t,"active"),(0,s.lG)(v,"disabled"),(0,s.lG)(f,"error"),(0,s.lG)(g,"negative"),(0,s.lG)(Z,"positive"),(0,s.lG)(w,"warning"),(0,s.X4)(b),(0,s.Ok)(k),h),j=(0,c.Z)(C,e),N=(0,o.Z)(C,e);return d.kK(p)?r.createElement(N,(0,a.Z)({},j,{className:x}),(0,l.Z)(u,(function(e){return m.create(e,{defaultProps:{as:n}})}))):r.createElement(N,(0,a.Z)({},j,{className:x}),p)}C.handledProps=["active","as","cellAs","cells","children","className","disabled","error","negative","positive","textAlign","verticalAlign","warning"],C.defaultProps={as:"tr",cellAs:"td"},C.propTypes={},C.create=(0,h.u5)(C,(function(e){return{cells:e}}));var j=C;function N(e){var t=e.attached,n=e.basic,u=e.celled,h=e.children,v=e.className,f=e.collapsing,m=e.color,g=e.columns,b=e.compact,w=e.definition,x=e.fixed,C=e.footerRow,G=e.headerRow,y=e.headerRows,A=e.inverted,R=e.padded,D=e.renderBodyRow,P=e.selectable,T=e.singleLine,E=e.size,U=e.sortable,M=e.stackable,H=e.striped,S=e.structured,O=e.tableData,I=e.textAlign,_=e.unstackable,F=e.verticalAlign,B=(0,i.Z)("ui",m,E,(0,s.lG)(u,"celled"),(0,s.lG)(f,"collapsing"),(0,s.lG)(w,"definition"),(0,s.lG)(x,"fixed"),(0,s.lG)(A,"inverted"),(0,s.lG)(P,"selectable"),(0,s.lG)(T,"single line"),(0,s.lG)(U,"sortable"),(0,s.lG)(M,"stackable"),(0,s.lG)(H,"striped"),(0,s.lG)(S,"structured"),(0,s.lG)(_,"unstackable"),(0,s.sU)(t,"attached"),(0,s.sU)(n,"basic"),(0,s.sU)(b,"compact"),(0,s.sU)(R,"padded"),(0,s.X4)(I),(0,s.Ok)(F),(0,s.H0)(g,"column"),"table",v),K=(0,c.Z)(N,e),L=(0,o.Z)(N,e);if(!d.kK(h))return r.createElement(L,(0,a.Z)({},K,{className:B}),h);var W={defaultProps:{cellAs:"th"}},z=(G||y)&&r.createElement(Z,null,j.create(G,W),(0,l.Z)(y,(function(e){return j.create(e,W)})));return r.createElement(L,(0,a.Z)({},K,{className:B}),z,r.createElement(p,null,D&&(0,l.Z)(O,(function(e,t){return j.create(D(e,t))}))),C&&r.createElement(k,null,j.create(C)))}N.handledProps=["as","attached","basic","celled","children","className","collapsing","color","columns","compact","definition","fixed","footerRow","headerRow","headerRows","inverted","padded","renderBodyRow","selectable","singleLine","size","sortable","stackable","striped","structured","tableData","textAlign","unstackable","verticalAlign"],N.defaultProps={as:"table"},N.propTypes={},N.Body=p,N.Cell=m,N.Footer=k,N.Header=Z,N.HeaderCell=x,N.Row=j;var G=N},5978:function(e,t,n){n.d(t,{Z:function(){return g}});var a=n(7462),l=n(4578),i=n(5622);var r=function(e,t,n){return null==e?e:(0,i.Z)(e,t,n)},s=n(2942),c=n(4517),o=n(2766),d=n(8182),u=n(2791),p=n(7826),h=n(6755),v=n(6246),f=n(2623),m=n(1126),g=function(e){function t(){for(var t,n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(t=e.call.apply(e,[this].concat(l))||this).inputRef=(0,u.createRef)(),t.labelRef=(0,u.createRef)(),t.canToggle=function(){var e=t.props,n=e.disabled,a=e.radio,l=e.readOnly,i=t.state.checked;return!n&&!l&&!(a&&i)},t.computeTabIndex=function(){var e=t.props,n=e.disabled,a=e.tabIndex;return(0,c.Z)(a)?n?-1:0:a},t.handleClick=function(e){var n=t.props.id,l=t.state,i=l.checked,r=l.indeterminate,o=(0,s.Z)(t.inputRef.current,"contains",e.target),d=(0,s.Z)(t.labelRef.current,"contains",e.target),u=!d&&!o,p=!(0,c.Z)(n);d&&p||(0,s.Z)(t.props,"onClick",e,(0,a.Z)({},t.props,{checked:!i,indeterminate:!!r})),t.isClickFromMouse&&(t.isClickFromMouse=!1,d&&!p&&t.handleChange(e),u&&t.handleChange(e),d&&p&&e.stopPropagation())},t.handleChange=function(e){var n=t.state.checked;t.canToggle()&&((0,s.Z)(t.props,"onChange",e,(0,a.Z)({},t.props,{checked:!n,indeterminate:!1})),t.setState({checked:!n,indeterminate:!1}))},t.handleMouseDown=function(e){var n=t.state,l=n.checked,i=n.indeterminate;(0,s.Z)(t.props,"onMouseDown",e,(0,a.Z)({},t.props,{checked:!!l,indeterminate:!!i})),e.defaultPrevented||(0,s.Z)(t.inputRef.current,"focus"),e.preventDefault()},t.handleMouseUp=function(e){var n=t.state,l=n.checked,i=n.indeterminate;t.isClickFromMouse=!0,(0,s.Z)(t.props,"onMouseUp",e,(0,a.Z)({},t.props,{checked:!!l,indeterminate:!!i}))},t.setIndeterminate=function(){var e=t.state.indeterminate;r(t.inputRef,"current.indeterminate",!!e)},t}(0,l.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.setIndeterminate()},n.componentDidUpdate=function(){this.setIndeterminate()},n.render=function(){var e=this.props,n=e.className,l=e.disabled,i=e.label,r=e.id,s=e.name,g=e.radio,Z=e.readOnly,b=e.slider,k=e.toggle,w=e.type,x=e.value,C=this.state,j=C.checked,N=C.indeterminate,G=(0,d.Z)("ui",(0,p.lG)(j,"checked"),(0,p.lG)(l,"disabled"),(0,p.lG)(N,"indeterminate"),(0,p.lG)((0,c.Z)(i),"fitted"),(0,p.lG)(g,"radio"),(0,p.lG)(Z,"read-only"),(0,p.lG)(b,"slider"),(0,p.lG)(k,"toggle"),"checkbox",n),y=(0,h.Z)(t,this.props),A=(0,v.Z)(t,this.props),R=(0,f.vR)(y,{htmlProps:f._l}),D=R[0],P=R[1],T=(0,m.i9)(i,{defaultProps:{htmlFor:r},autoGenerateKey:!1})||u.createElement("label",{htmlFor:r});return u.createElement(A,(0,a.Z)({},P,{className:G,onClick:this.handleClick,onChange:this.handleChange,onMouseDown:this.handleMouseDown,onMouseUp:this.handleMouseUp}),u.createElement(o.R,{innerRef:this.inputRef},u.createElement("input",(0,a.Z)({},D,{checked:j,className:"hidden",disabled:l,id:r,name:s,readOnly:!0,tabIndex:this.computeTabIndex(),type:w,value:x}))),u.createElement(o.R,{innerRef:this.labelRef},T))},t}(n(5326).Z);g.handledProps=["as","checked","className","defaultChecked","defaultIndeterminate","disabled","fitted","id","indeterminate","label","name","onChange","onClick","onMouseDown","onMouseUp","radio","readOnly","slider","tabIndex","toggle","type","value"],g.propTypes={},g.defaultProps={type:"checkbox"},g.autoControlledProps=["checked","indeterminate"]},2530:function(){}}]);
//# sourceMappingURL=978.58ad7ddf.chunk.js.map