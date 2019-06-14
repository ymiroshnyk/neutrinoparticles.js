var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(t,f,a){if(a.get||a.set)throw new TypeError("ES3 does not support getters and setters.");t!=Array.prototype&&t!=Object.prototype&&(t[f]=a.value)};$jscomp.getGlobal=function(t){return"undefined"!=typeof window&&window===t?t:"undefined"!=typeof global&&null!=global?global:t};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(t,f,a,b){if(f){a=$jscomp.global;t=t.split(".");for(b=0;b<t.length-1;b++){var c=t[b];c in a||(a[c]={});a=a[c]}t=t[t.length-1];b=a[t];f=f(b);f!=b&&null!=f&&$jscomp.defineProperty(a,t,{configurable:!0,writable:!0,value:f})}};$jscomp.polyfill("Number.EPSILON",function(t){return Math.pow(2,-52)},"es6-impl","es3");
function NeutrinoParticles(){function t(a){return 16>a?"0"+a.toString(16):a.toString(16)}var f=this;this.equalv3_=function(a,b){return a[0]==b[0]&&a[1]==b[1]&&a[2]==b[2]};this.equalq_=function(a,b){return a[0]==b[0]&&a[1]==b[1]&&a[2]==b[2]&&a[3]==b[3]};this.a=function(a,b,c){a[0]=b[0]+c[0];a[1]=b[1]+c[1]};this.b=function(a,b){return[a[0]+b[0],a[1]+b[1]]};this.y=function(a,b,c){a[0]=b[0]+c;a[1]=b[1]+c};this.z=function(a,b){return[a[0]+b,a[1]+b]};this.c=function(a,b,c){a[0]=b[0]+c[0];a[1]=b[1]+c[1];
a[2]=b[2]+c[2]};this.d=function(a,b){return[a[0]+b[0],a[1]+b[1],a[2]+b[2]]};this.C=function(a,b,c){a[0]=b[0]+c;a[1]=b[1]+c;a[2]=b[2]+c};this.D=function(a,b){return[a[0]+b,a[1]+b,a[2]+b]};this.addq=function(a,b,c){a[0]=b[0]+c[0];a[1]=b[1]+c[1];a[2]=b[2]+c[2];a[3]=b[3]+c[3]};this.addq_=function(a,b){return[a[0]+b[0],a[1]+b[1],a[2]+b[2],a[3]+b[3]]};this.e=function(a,b,c){a[0]=b[0]-c[0];a[1]=b[1]-c[1]};this.f=function(a,b){return[a[0]-b[0],a[1]-b[1]]};this.A=function(a,b,c){a[0]=b[0]-c;a[1]=b[1]-c};this.B=
function(a,b){return[a[0]-b,a[1]-b]};this.nf=function(a,b,c){a[0]=b-c[0];a[1]=b-c[1]};this.of=function(a,b){return[a-b[0],a-b[1]]};this.g=function(a,b,c){a[0]=b[0]-c[0];a[1]=b[1]-c[1];a[2]=b[2]-c[2]};this.h=function(a,b){return[a[0]-b[0],a[1]-b[1],a[2]-b[2]]};this.E=function(a,b,c){a[0]=b[0]-c;a[1]=b[1]-c;a[2]=b[2]-c};this.F=function(a,b){return[a[0]-b,a[1]-b,a[2]-b]};this.rf=function(a,b,c){a[0]=b-c[0];a[1]=b-c[1];a[2]=b-c[2]};this.sf=function(a,b){return[a-b[0],a-b[1],a-b[2]]};this.i=function(a,
b,c){a[0]=b[0]*c[0];a[1]=b[1]*c[1]};this.j=function(a,b){return[a[0]*b[0],a[1]*b[1]]};this.k=function(a,b,c){a[0]=b[0]*c[0];a[1]=b[1]*c[1];a[2]=b[2]*c[2]};this.l=function(a,b){return[a[0]*b[0],a[1]*b[1],a[2]*b[2]]};this.m=function(a,b,c){a[0]=b[0]/c[0];a[1]=b[1]/c[1]};this.n=function(a,b){return[a[0]/b[0],a[1]/b[1]]};this.o=function(a,b,c){a[0]=b[0]/c[0];a[1]=b[1]/c[1];a[2]=b[2]/c[2]};this.p=function(a,b){return[a[0]/b[0],a[1]/b[1],a[2]/b[2]]};this.H=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*
b[2]};this.dotq_=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3]};this.q=function(a,b,c){a[0]=b[0]*c;a[1]=b[1]*c};this.r=function(a,b){return[a[0]*b,a[1]*b]};this.s=function(a,b,c){a[0]=b[0]/c;a[1]=b[1]/c};this.t=function(a,b){return[a[0]/b,a[1]/b]};this.u=function(a,b,c){a[0]=b[0]*c;a[1]=b[1]*c;a[2]=b[2]*c};this.v=function(a,b){return[a[0]*b,a[1]*b,a[2]*b]};this.w=function(a,b,c){a[0]=b[0]/c;a[1]=b[1]/c;a[2]=b[2]/c};this.x=function(a,b){return[a[0]/b,a[1]/b,a[2]/b]};this.y=function(a,
b,c){a[0]=b[0]+c;a[1]=b[1]+c};this.z=function(a,b){return[a[0]+b,a[1]+b]};this.A=function(a,b,c){a[0]=b[0]-c;a[1]=b[1]-c};this.B=function(a,b){return[a[0]-b,a[1]-b]};this.G=function(a,b){return a[0]*b[0]+a[1]*b[1]};this.H=function(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]};this.I=function(a,b,c){var e=b[0],d=b[1];b=b[2];var f=c[0],n=c[1];c=c[2];a[0]=d*c-b*n;a[1]=b*f-e*c;a[2]=e*n-d*f};this.J=function(a,b){var c=a[0],e=a[1],d=a[2],f=b[0],n=b[1],m=b[2];return[e*m-d*n,d*f-c*m,c*n-e*f]};this.K=function(a){return Math.sqrt(a[0]*
a[0]+a[1]*a[1])};this.L=function(a){return a[0]*a[0]+a[1]*a[1]};this.M=function(a,b){f.q(a,b,1/f.K(b))};this.N=function(a){return f.r(a,1/f.K(a))};this.O=function(a){return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2])};this.P=function(a){return a[0]*a[0]+a[1]*a[1]+a[2]*a[2]};this.Q=function(a,b){f.u(a,b,1/f.O(b))};this.R=function(a){return f.v(a,1/f.O(a))};this.S=function(a,b){a[0]=b[0];a[1]=b[1]};this.T=function(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2]};this.U=function(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=
b[3]};this.V=function(a,b,c){a[0]=b;a[1]=c};this.W=function(a,b,c,e){a[0]=b;a[1]=c;a[2]=e};this.X=function(a,b,c){return a+(b-a)*c};this.Y=function(a,b,c,e){a[0]=b[0]+(c[0]-b[0])*e;a[1]=b[1]+(c[1]-b[1])*e};this.Z=function(a,b,c){return[a[0]+(b[0]-a[0])*c,a[1]+(b[1]-a[1])*c]};this.ab=function(a,b,c,e){a[0]=b[0]+(c[0]-b[0])*e;a[1]=b[1]+(c[1]-b[1])*e;a[2]=b[2]+(c[2]-b[2])*e};this.bb=function(a,b,c){return[a[0]+(b[0]-a[0])*c,a[1]+(b[1]-a[1])*c,a[2]+(b[2]-a[2])*c]};this.slerpq=function(a,b,c,e){var d=
f.dotq_(b,c),q=[];0>d?(f.negq(q,c),d=-d):f.U(q,c);1-d<Number.EPSILON?(a[0]=f.X(b[0],c[0],e),a[1]=f.X(b[1],c[1],e),a[2]=f.X(b[2],c[2],e),a[3]=f.X(b[3],c[3],e)):(c=f.acos_(d),f.mulqscalar(a,f.addq_(f.mulqscalar_(b,f.sin_((1-e)*c)),f.mulqscalar_(q,f.sin_(e*c))),1/f.sin_(c)))};this.slerpq_=function(a,b,c){var e=[];slerpq(e,a,b,c);return e};this.acos_=function(a){return Math.acos(a)};this.sin_=function(a){return Math.sin(a)};this.cos_=function(a){return Math.cos(a)};this.taus88=function(a){a||(a=0);var b,
c,e;this.seed=function(a){a&=4294967295;b=2>a?a+2:a;c=8>a?a+8:a;e=16>a?a+16:a};this.rand=function(){var a=((b<<13^b)&4294967295)>>>19;b=((b&4294967294)<<12^a)>>>0;a=((c<<2^c)&4294967295)>>>25;c=((c&4294967288)<<4^a)>>>0;a=((e<<3^e)&4294967295)>>>11;e=((e&4294967280)<<17^a)>>>0;return((b^c^e)>>>0)/4294967296};this.seed(a)};this.cb=function(a,b){this.randv2gen(a,b,function(){return Math.random()})};this.randv2gen=function(a,b,c){c=c()*Math.PI*2;a[0]=b*f.cos_(c);a[1]=b*f.sin_(c)};this.db=function(a,
b){this.randv3gen(a,b,function(){return Math.random()})};this.randv3gen=function(a,b,c){var e=c()*Math.PI*2;c=-1+2*c();var d=b*Math.sqrt(1-c*c);a[0]=d*f.cos_(e);a[1]=d*f.sin_(e);a[2]=b*c};this.yb=function(a,b,c,e,d){b+=d()*e[0];c+=d()*e[1];f.V(a,b,c)};this.eb=function(a,b){f.V(-b[0],-b[1])};this.fb=function(a){return[-a[0],-a[1]]};this.gb=function(a,b){f.W(-b[0],-b[1],-b[2])};this.hb=function(a){return[-a[0],-a[1],-a[2]]};this.negq=function(a,b){a[0]=-b[0];a[1]=-b[1];a[2]=-b[2];a[3]=-b[3]};this.negq_=
function(a){return[-a[0],-a[1],-a[2],-a[3]]};this.ib=function(a){return a/180*Math.PI};this.jb=function(a){return a/Math.PI*180};this.Ae=function(a){return 0>a?-1:1};this.ob=function(a,b,c,e){var d=2*e[0]*e[0],f=2*e[1]*e[1],n=2*e[2]*e[2],m=2*e[0]*e[1],r=2*e[0]*e[2],g=2*e[1]*e[2],k=2*e[3]*e[2],y=2*e[3]*e[1];e=2*e[3]*e[0];a[0]=1-f-n;a[1]=m+k;a[2]=r-y;b[0]=m-k;b[1]=1-d-n;b[2]=g+e;c[0]=r+y;c[1]=g-e;c[2]=1-d-f};this.axes2quat=this.pb=function(a,b,c,e){var d=b[0]+c[1]+e[2];0<d?(d=2*Math.sqrt(d+1),a[3]=
.25*d,a[0]=(c[2]-e[1])/d,a[1]=(e[0]-b[2])/d,a[2]=(b[1]-c[0])/d):b[0]>c[1]&b[0]>e[2]?(d=2*Math.sqrt(1+b[0]-c[1]-e[2]),a[3]=(c[2]-e[1])/d,a[0]=.25*d,a[1]=(b[1]+c[0])/d,a[2]=(e[0]+b[2])/d):c[1]>e[2]?(d=2*Math.sqrt(1+c[1]-b[0]-e[2]),a[3]=(e[0]-b[2])/d,a[0]=(b[1]+c[0])/d,a[1]=.25*d,a[2]=(c[2]+e[1])/d):(d=2*Math.sqrt(1+e[2]-b[0]-c[1]),a[3]=(b[1]-c[0])/d,a[0]=(e[0]+b[2])/d,a[1]=(c[2]+e[1])/d,a[2]=.25*d)};this.axisangle2quat=this.qb=function(a,b,c){c=.5*f.ib(c);var e=Math.sin(c);a[0]=b[0]*e;a[1]=b[1]*e;a[2]=
b[2]*e;a[3]=Math.cos(c)};this.axisangle2quat_=this.axisangle2quat_=function(a,b){var c=.5*f.ib(b),e=Math.sin(c);return[a[0]*e,a[1]*e,a[2]*e,f.cos_(c)]};this.rb=function(a,b,c){var e=b[0],d=b[1],f=b[2];b=c[0];var n=c[1],m=c[2];c=c[3];var r=c*e+n*f-m*d,g=c*d+m*e-b*f,k=c*f+b*d-n*e,e=-b*e-n*d-m*f;a[0]=r*c+e*-b+g*-m-k*-n;a[1]=g*c+e*-n+k*-b-r*-m;a[2]=k*c+e*-m+r*-n-g*-b};this.sb=function(a,b,c){var e=b[0],d=b[1],f=b[2];b=b[3];var n=c[0],m=c[1],r=c[2];c=c[3];a[0]=e*c+b*n+d*r-f*m;a[1]=d*c+b*m+f*n-e*r;a[2]=
f*c+b*r+e*m-d*n;a[3]=b*c-e*n-d*m-f*r};this.mulqscalar=function(a,b,c){a[0]=b[0]*c;a[1]=b[1]*c;a[2]=b[2]*c;a[3]=b[3]*c};this.mulqscalar_=function(a,b){return[a[0]*b,a[1]*b,a[2]*b,a[3]*b]};this.tb=function(a,b,c,e,d){var q=f.ib(c);c=Math.cos(q)*e;e*=Math.sin(q);a[0]=b[0]+c*d[0]-e*d[1];a[1]=b[1]+e*d[0]+c*d[1]};this.ub=function(a,b,c,e,d){var q=f.ib(c);c=Math.cos(q)/e;e=Math.sin(q)/e;a[0]=c*d[0]+e*d[1]-b[0]*c-b[1]*e;a[1]=c*d[1]-e*d[0]+b[0]*e-b[1]*c};this.vb=function(a){return 0>a?Math.floor(f.yd-1+a%
f.yd):Math.floor(a%f.yd)};this.ff=function(a){return"#"+t(Math.floor(255*a[0]))+t(Math.floor(255*a[1]))+t(Math.floor(255*a[2]))};this.wb=function(a,b,c,e){b=3*(c*f.yd+b);e=f.zd[e];a[0]=e.getUint8(b);a[1]=e.getUint8(b+1);a[2]=e.getUint8(b+2)};this.xb=function(a,b){if(null==f.zd)f.W(a,128,128,128);else{var c=b[0]*f.yd,e=b[1]*f.yd,d=b[2]*f.yd,q=Math.floor(c),n=Math.floor(e),m=Math.floor(d),c=c-q,e=e-n,d=d-m,r=f.vb(q),g=f.vb(q+1),k=f.vb(n),y=f.vb(n+1),t=f.vb(m),D=f.vb(m+1),m=[],n=[],q=[],E=[],H=[],J=
[],I=[],K=[];f.wb(m,r,k,t);f.wb(n,r,k,D);f.wb(q,r,y,t);f.wb(E,r,y,D);f.wb(H,g,k,t);f.wb(J,g,k,D);f.wb(I,g,y,t);f.wb(K,g,y,D);r=[];g=[];k=[];y=[];f.ab(r,m,n,d);f.ab(g,q,E,d);f.ab(k,H,J,d);f.ab(y,I,K,d);d=[];m=[];f.ab(d,r,g,e);f.ab(m,k,y,e);f.ab(a,d,m,c)}};this.ImageDesc=function(a,b,c,e,d){this.image=a;this.x=b;this.y=c;this.width=e;this.height=d};this.RenderCall=function(a,b,c){this.startIndex=a;this.numIndices=b;this.renderStyleIndex=c};this.SubRect=function(a,b,c,e){this.x=a;this.y=b;this.width=
c;this.height=e};this.Camera2D=function(){};this.Camera2D.prototype.tb=function(a,b){return!0};this.Camera3D=function(a,b){this.Qd=f.r(a,.5);this.z=-(.5*a[0])/Math.tan(f.ib(.5*b))};this.Camera3D.prototype.transform=function(a,b){if(a[2]<this.z)return!1;var c=-this.z/(a[2]-this.z);f.a(a,f.r(f.f(a,this.Qd),c),this.Qd);f.q(b,b,c);return!0};this.zd=null;this.yd=0;this.initializeNoise=function(a,b,c){a||alert("path should be defined");if(null!=this.zd)b();else{if(null==a||void 0==a)a=this.defaultPath;
var e=new XMLHttpRequest;e.open("GET",a+"neutrinoparticles.noise.bin",!0);e.responseType="arraybuffer";e.ctx=this;e.onreadystatechange=function(){if(4==e.readyState)if(200<=e.status&&300>e.status||304==e.status){var a=e.response,f=e.ctx,n=(new DataView(a,0,4)).getUint32(0,!0);f.zd=[];f.yd=n;for(var m=0;m<n;++m)f.zd[m]=new DataView(a,4+3*n*n*m);b&&b()}else c&&c()};e.send()}};this.NoiseGenerator=function(){for(var a=function(a,b,c,d,e){return.5*(2*b+(-a+c)*e+(2*a-5*b+4*c-d)*e*e+(-a+3*b-3*c+d)*e*e*e)},
b=function(b,c,d,e,f){return[a(b[0],c[0],d[0],e[0],f),a(b[1],c[1],d[1],e[1],f),a(b[2],c[2],d[2],e[2],f)]},c=function(a,b,c){return a<b?b:a>c?c:a},e=[],d=[],t=new f.taus88(120),n=.7,m=64,r,g,k,y,L,D,E,H=0,J=0,I=m>>>1;0<I;I>>>=1)var K=Math.floor(64/I),H=H+K*K;var F=0;this.progress=0;this.step=function(){switch(F){case 0:for(var a=0;64>a;++a)for(var h=e[a]=[],p=0;64>p;++p)for(var v=h[p]=[],l=0;64>l;++l)v[l]=[0,0,0];F=1;this.progress=.01;break;case 1:r=m>>>1;g=Math.floor(64/r);k=g*g;y=Math.max(g-1,1);
L=g*g*g;for(a=E=D=0;a<L;++a)d[a]=[],d[a][2]=2*t.rand()-1,d[a][1]=2*t.rand()-1,d[a][0]=2*t.rand()-1;F=2;break;case 2:for(a=0;a<g;++a)for(var h=D-1>>>0&y,p=D>>>0&y,v=D+1>>>0&y,l=D+2>>>0&y,w=E-1>>>0&y,x=E>>>0&y,u=E+1>>>0&y,q=E+2>>>0&y,C=a-1>>>0&y,z=a>>>0&y,A=a+1>>>0&y,B=a+2>>>0&y,h=[[[d[h*k+w*g+C],d[h*k+w*g+z],d[h*k+w*g+A],d[h*k+w*g+B]],[d[h*k+x*g+C],d[h*k+x*g+z],d[h*k+x*g+A],d[h*k+x*g+B]],[d[h*k+u*g+C],d[h*k+u*g+z],d[h*k+u*g+A],d[h*k+u*g+B]],[d[h*k+q*g+C],d[h*k+q*g+z],d[h*k+q*g+A],d[h*k+q*g+B]]],[[d[p*
k+w*g+C],d[p*k+w*g+z],d[p*k+w*g+A],d[p*k+w*g+B]],[d[p*k+x*g+C],d[p*k+x*g+z],d[p*k+x*g+A],d[p*k+x*g+B]],[d[p*k+u*g+C],d[p*k+u*g+z],d[p*k+u*g+A],d[p*k+u*g+B]],[d[p*k+q*g+C],d[p*k+q*g+z],d[p*k+q*g+A],d[p*k+q*g+B]]],[[d[v*k+w*g+C],d[v*k+w*g+z],d[v*k+w*g+A],d[v*k+w*g+B]],[d[v*k+x*g+C],d[v*k+x*g+z],d[v*k+x*g+A],d[v*k+x*g+B]],[d[v*k+u*g+C],d[v*k+u*g+z],d[v*k+u*g+A],d[v*k+u*g+B]],[d[v*k+q*g+C],d[v*k+q*g+z],d[v*k+q*g+A],d[v*k+q*g+B]]],[[d[l*k+w*g+C],d[l*k+w*g+z],d[l*k+w*g+A],d[l*k+w*g+B]],[d[l*k+x*g+C],d[l*
k+x*g+z],d[l*k+x*g+A],d[l*k+x*g+B]],[d[l*k+u*g+C],d[l*k+u*g+z],d[l*k+u*g+A],d[l*k+u*g+B]],[d[l*k+q*g+C],d[l*k+q*g+z],d[l*k+q*g+A],d[l*k+q*g+B]]]],p=0;p<r;++p)for(l=p/r,v=D*r+p,l=[[b(h[0][0][0],h[1][0][0],h[2][0][0],h[3][0][0],l),b(h[0][0][1],h[1][0][1],h[2][0][1],h[3][0][1],l),b(h[0][0][2],h[1][0][2],h[2][0][2],h[3][0][2],l),b(h[0][0][3],h[1][0][3],h[2][0][3],h[3][0][3],l)],[b(h[0][1][0],h[1][1][0],h[2][1][0],h[3][1][0],l),b(h[0][1][1],h[1][1][1],h[2][1][1],h[3][1][1],l),b(h[0][1][2],h[1][1][2],h[2][1][2],
h[3][1][2],l),b(h[0][1][3],h[1][1][3],h[2][1][3],h[3][1][3],l)],[b(h[0][2][0],h[1][2][0],h[2][2][0],h[3][2][0],l),b(h[0][2][1],h[1][2][1],h[2][2][1],h[3][2][1],l),b(h[0][2][2],h[1][2][2],h[2][2][2],h[3][2][2],l),b(h[0][2][3],h[1][2][3],h[2][2][3],h[3][2][3],l)],[b(h[0][2][0],h[1][3][0],h[2][3][0],h[3][3][0],l),b(h[0][2][1],h[1][3][1],h[2][3][1],h[3][3][1],l),b(h[0][2][2],h[1][3][2],h[2][3][2],h[3][3][2],l),b(h[0][2][3],h[1][3][3],h[2][3][3],h[3][3][3],l)]],w=0;w<r;++w)for(z=w/r,x=E*r+w,u=b(l[0][0],
l[1][0],l[2][0],l[3][0],z),q=b(l[0][1],l[1][1],l[2][1],l[3][1],z),C=b(l[0][2],l[1][2],l[2][2],l[3][2],z),z=b(l[0][3],l[1][3],l[2][3],l[3][3],z),A=0;A<r;++A){var B=a*r+A,G=b(u,q,C,z,A/r),G=f.d(f.v(G,n),e[v][x][B]),G=[c(G[0],-1,1),c(G[1],-1,1),c(G[2],-1,1)];e[v][x][B]=G}J++;this.progress=.01+J/H*.89;E++;E>=g&&(E=0,D++,D>=g&&(D=0,m=r,n=Math.pow(n,1.2),1>=m?(F=3,this.progress=.9):F=1));break;case 3:a=[-1,-1,-1];h=[.5,.7,1];for(p=0;64>p;++p)for(v=e[p],l=0;64>l;++l)for(w=v[l],x=0;64>x;++x)u=w[x],u[0]=f.X(a[0],
h[0],.5*u[0]+.5),u[1]=f.X(a[1],h[1],.5*u[1]+.5),u[2]=f.X(a[2],h[2],.5*u[2]+.5);F=4;this.progress=.95;break;case 4:f.yd=64;f.zd=[];for(a=0;64>a;++a){h=e[a];p=new ArrayBuffer(12288);p=new DataView(p);for(v=0;64>v;++v)for(l=h[v],w=0;64>w;++w)x=l[w],u=3*(64*v+w),p.setUint8(u+0,Math.floor(c(256*(.5*x[0]+.5)-.5,0,255))),p.setUint8(u+1,Math.floor(c(256*(.5*x[1]+.5)-.5,0,255))),p.setUint8(u+2,Math.floor(c(256*(.5*x[2]+.5)-.5,0,255)));f.zd[a]=p}F=5;this.progress=1}return 5==F}};this.cf=document.createElement("canvas");
this.cf.width=0;this.cf.height=0;this.bf=this.cf.getContext("2d");this.af=function(a,b){if(this.cf.width<a||this.cf.height<b)this.cf.width=a,this.cf.height=b,this.bf=this.cf.getContext("2d")};this.effects=[];this.loadEffect=function(a,b,c){if(void 0!=this.effects[a]){var e=this.effects[a];e instanceof Array?e[e.length]=[b,c]:b(e)}else{this.effects[a]=[[b,c]];var d=new XMLHttpRequest;d.open("GET",a,!0);d.responseType="text";d.ctx=this;d.onreadystatechange=function(){if(4==d.readyState){var b=this.ctx.effects[a];
if(200<=d.status&&300>d.status||304==d.status){var c=eval("(function(ctx) {\n"+d.responseText+"\nreturn new NeutrinoEffect(ctx);\n})(this.ctx);");this.ctx.effects[a]=c;b.forEach(function(a){a[0](c)})}else b.forEach(function(a){a[1]()})}};d.send()}};this.removeEffect=function(a){delete this.effects[a]}};

(function (root, factory) {
    var resolved = [],
        required = ["require","exports","module"],
        i, len = required.length;

    if (typeof define === "function" && define.amd) {
        define("neutrinoparticles.pixi",["require","exports","module"], factory);
    } else if (typeof exports === "object") {
        for (i = 0; i < len; i += 1) {
            resolved.push(require(required[i]));
        }

        module.exports = factory.apply({}, resolved);
    } else {
        for (i = 0; i < len; i += 1) {
            resolved.push(root[required[i]]);
        }

        root["neutrinoparticles.pixi"] = factory.apply({}, resolved);
    }
}(this, function (require,exports,module) {
    
    return "use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PIXINeutrinoContext = function () {
	function PIXINeutrinoContext(renderer) {
		_classCallCheck(this, PIXINeutrinoContext);

		var gl = renderer.gl;

		this.renderer = renderer;
		this.neutrino = new NeutrinoParticles();
		this.effectsBasePath = "";
		this.texturesBasePath = "";
		this.trimmedExtensionLookupFirst = true;

		if (!(renderer instanceof PIXI.CanvasRenderer)) {
			this.materials = new PIXINeutrinoMaterials(this);
		}
	}

	_createClass(PIXINeutrinoContext, [{
		key: "initializeNoise",
		value: function initializeNoise(path, success, fail) {
			this.neutrino.initializeNoise(path, success, fail);
		}
	}, {
		key: "loadEffect",
		value: function loadEffect(path, success, fail) {
			this.neutrino.loadEffect(path, success, fail);
		}
	}]);

	return PIXINeutrinoContext;
}();

var PIXINeutrinoEffect = function (_PIXI$Container) {
	_inherits(PIXINeutrinoEffect, _PIXI$Container);

	function PIXINeutrinoEffect(effectModel, position, rotation, scale, baseParent) {
		_classCallCheck(this, PIXINeutrinoEffect);

		var _this = _possibleConstructorReturn(this, (PIXINeutrinoEffect.__proto__ || Object.getPrototypeOf(PIXINeutrinoEffect)).call(this));

		_this.ctx = effectModel.ctx;
		_this.effectModel = effectModel;
		_this.effect = null;
		_this.baseParent = baseParent;

		if (position) {
			_this.position.set(position[0], position[1]);
			_this.positionZ = position[2];
		} else {
			_this.position.set(0, 0);
			_this.positionZ = 0;
		}

		if (rotation) _this.rotation = rotation;

		if (scale) {
			_this.scale.x = scale[0];
			_this.scale.y = scale[1];
			_this.scaleZ = scale[2];
		} else _this.scaleZ = 1;

		if (effectModel.ready()) {
			_this._onEffectReady();
		} else {
			effectModel.once('ready', function () {
				this._onEffectReady();
			}, _this);
		}

		_this._updateWorldTransform();
		return _this;
	}

	_createClass(PIXINeutrinoEffect, [{
		key: "ready",
		value: function ready() {
			return this.effect != null;
		}
	}, {
		key: "update",
		value: function update(dt) {
			this._updateWorldTransform();

			if (this.effect != null) {
				this.effect.update(dt, this._scaledPosition(), this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.worldRotationDegree));
			}
		}
	}, {
		key: "renderCanvas",
		value: function renderCanvas(renderer) {
			if (!this.ready()) return;

			if (this.baseParent) {
				var sx = this.worldScale.x;
				var sy = this.worldScale.y;
				var m = this.baseParent.worldTransform;
				renderer.context.setTransform(m.a * sx, m.b * sy, m.c * sx, m.d * sy, m.tx * sx, m.ty * sy);
			} else {
				renderer.context.setTransform(this.worldScale.x, 0, 0, this.worldScale.y, 0, 0);
			}

			this.effect.draw(renderer.context);
		}
	}, {
		key: "renderWebGL",
		value: function renderWebGL(renderer) {
			if (!this.ready()) return;

			renderer.setObjectRenderer(renderer.emptyRenderer);

			if (this.baseParent) {
				var sx = this.worldScale.x;
				var sy = this.worldScale.y;
				var m = this.baseParent.worldTransform;
				this.ctx.materials.setup([m.a * sx, m.b * sy, 0, m.c * sx, m.d * sy, 0, m.tx * sx, m.ty * sy, 1]);
			} else {
				this.ctx.materials.setup([this.worldScale.x, 0, 0, 0, this.worldScale.y, 0, 0, 0, 1]);
			}

			this.effect.fillGeometryBuffers([1, 0, 0], [0, -1, 0], [0, 0, -1]);

			this.renderBuffers.updateGlBuffers();
			this.renderBuffers.bind();

			for (var renderCallIdx = 0; renderCallIdx < this.renderBuffers.numRenderCalls; ++renderCallIdx) {
				var renderCall = this.renderBuffers.renderCalls[renderCallIdx];
				var texIndex = this.effect.model.renderStyles[renderCall.renderStyleIndex].textureIndices[0];

				var texture = this.effectModel.textures[texIndex];
				renderer.bindTexture(texture, 0, true);

				var premultiplied = texture.baseTexture.premultipliedAlpha;
				var materialIndex = this.effect.model.renderStyles[renderCall.renderStyleIndex].materialIndex;
				switch (this.effect.model.materials[materialIndex]) {
					default:
						this.ctx.materials.switchToNormal(premultiplied);break;
					case 1:
						this.ctx.materials.switchToAdd(premultiplied);break;
					case 2:
						this.ctx.materials.switchToMultiply(premultiplied);break;
				}

				this.renderBuffers.draw(renderCall.numIndices, renderCall.startIndex);
			}
		}
	}, {
		key: "restart",
		value: function restart(position, rotation) {
			if (position) {
				this.position.x = position[0];
				this.position.y = position[1];
				this.positionZ = position[2];
			}

			if (rotation) {
				this.rotation = rotation;
			}

			this._updateWorldTransform();

			this.effect.restart(this._scaledPosition(), rotation ? this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.worldRotationDegree) : null);
		}
	}, {
		key: "resetPosition",
		value: function resetPosition(position, rotation) {
			if (position) {
				this.position.x = position[0];
				this.position.y = position[1];
				this.positionZ = position[2];
			}

			if (rotation) {
				this.rotation = rotation;
			}

			this._updateWorldTransform();

			this.effect.resetPosition(this._scaledPosition(), rotation ? this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.worldRotationDegree) : null);
		}
	}, {
		key: "setPropertyInAllEmitters",
		value: function setPropertyInAllEmitters(name, value) {
			this.effect.setPropertyInAllEmitters(name, value);
		}
	}, {
		key: "getNumParticles",
		value: function getNumParticles() {
			return this.effect.getNumParticles();
		}
	}, {
		key: "_scaledPosition",
		value: function _scaledPosition() {
			return [this.worldPosition.x / this.worldScale.x, this.worldPosition.y / this.worldScale.y, this.positionZ / this.scaleZ];
		}
	}, {
		key: "_updateWorldTransform",
		value: function _updateWorldTransform() {
			var localPosition = new PIXI.Point(0, 0);
			var localXAxis = new PIXI.Point(1, 0);
			var localYAxis = new PIXI.Point(0, 1);

			var worldXAxis, worldYAxis;

			if (this.baseParent) {
				this.worldPosition = this.baseParent.toLocal(localPosition, this);
				worldXAxis = this.baseParent.toLocal(localXAxis, this);
				worldYAxis = this.baseParent.toLocal(localYAxis, this);
			} else {
				this.worldPosition = this.toGlobal(localPosition);
				worldXAxis = this.toGlobal(localXAxis);
				worldYAxis = this.toGlobal(localYAxis);
			}

			worldXAxis.x -= this.worldPosition.x;
			worldXAxis.y -= this.worldPosition.y;
			worldYAxis.x -= this.worldPosition.x;
			worldYAxis.y -= this.worldPosition.y;

			this.worldScale = {
				x: Math.sqrt(worldXAxis.x * worldXAxis.x + worldXAxis.y * worldXAxis.y),
				y: Math.sqrt(worldYAxis.x * worldYAxis.x + worldYAxis.y * worldYAxis.y)
			};

			this.worldRotationDegree = this._calcWorldRotation(this) / Math.PI * 180 % 360;
		}
	}, {
		key: "_calcWorldRotation",
		value: function _calcWorldRotation(obj) {
			if (obj.parent && obj.parent != this.baseParent) return obj.rotation + this._calcWorldRotation(obj.parent);else return obj.rotation;
		}
	}, {
		key: "_onEffectReady",
		value: function _onEffectReady() {
			this._updateWorldTransform();

			var position = this._scaledPosition();
			var rotation = this.ctx.neutrino.axisangle2quat_([0, 0, 1], this.worldRotationDegree);

			if (this.effectModel.ctx.renderer instanceof PIXI.CanvasRenderer) {
				this.effect = this.effectModel.effectModel.createCanvas2DInstance(position, rotation);
				this.effect.textureDescs = this.effectModel.textureImageDescs;
			} else {
				this.renderBuffers = new PIXINeutrinoRenderBuffers(this.ctx);
				this.effect = this.effectModel.effectModel.createWGLInstance(position, rotation, this.renderBuffers);
				this.effect.texturesRemap = this.effectModel.texturesRemap;
			}

			this.emit('ready', this);
		}
	}]);

	return PIXINeutrinoEffect;
}(PIXI.Container);

var PIXINeutrinoEffectModel = function (_PIXI$DisplayObject) {
	_inherits(PIXINeutrinoEffectModel, _PIXI$DisplayObject);

	function PIXINeutrinoEffectModel(context, effectPath) {
		_classCallCheck(this, PIXINeutrinoEffectModel);

		var _this2 = _possibleConstructorReturn(this, (PIXINeutrinoEffectModel.__proto__ || Object.getPrototypeOf(PIXINeutrinoEffectModel)).call(this));

		_this2.ctx = context;
		_this2.effectPath = effectPath;
		_this2.effectModel = null;
		_this2.numTexturesToLoadLeft = -1;
		_this2.texturesRemap = null;

		var pixiNeutrinoEffect = _this2;
		_this2.ctx.neutrino.loadEffect(_this2.ctx.effectsBasePath + effectPath, function (effectModel) {
			pixiNeutrinoEffect._onEffectLoaded(effectModel);
		});
		return _this2;
	}

	_createClass(PIXINeutrinoEffectModel, [{
		key: "ready",
		value: function ready() {
			return this.numTexturesToLoadLeft === 0;
		}
	}, {
		key: "_onEffectLoaded",
		value: function _onEffectLoaded(effectModel) {
			this.effectModel = effectModel;
			this.textures = [];
			this.textureImageDescs = [];
			var numTextures = effectModel.textures.length;
			this.numTexturesToLoadLeft = numTextures;

			for (var imageIndex = 0; imageIndex < numTextures; ++imageIndex) {
				var texturePath = effectModel.textures[imageIndex];
				var texture = null;

				if (this.ctx.trimmedExtensionLookupFirst) {
					var trimmedTexturePath = texturePath.replace(/\.[^/.]+$/, ""); // https://stackoverflow.com/a/4250408
					texture = PIXI.utils.TextureCache[trimmedTexturePath];
				}

				if (!texture) texture = PIXI.utils.TextureCache[texturePath];

				if (!texture) texture = PIXI.Texture.fromImage(this.ctx.texturesBasePath + texturePath);

				if (texture.baseTexture.hasLoaded) {
					this._onTextureLoaded(imageIndex, texture);
				} else {
					texture.once('update', function (self, imageIndex, texture) {
						return function () {
							self._onTextureLoaded(imageIndex, texture);
						};
					}(this, imageIndex, texture));
				}
			}
		}
	}, {
		key: "_onTextureLoaded",
		value: function _onTextureLoaded(index, texture) {
			this.textures[index] = texture;

			this.numTexturesToLoadLeft--;

			if (this.ctx.renderer instanceof PIXI.CanvasRenderer) {
				var image = texture.baseTexture.source;
				this.textureImageDescs[index] = new this.ctx.neutrino.ImageDesc(image, texture.orig.x, texture.orig.y, texture.orig.width, texture.orig.height);
			} else {}

			if (this.numTexturesToLoadLeft === 0) {

				if (this.ctx.renderer instanceof PIXI.CanvasRenderer) {} else {
					this._initTexturesRemapIfNeeded();
				}

				this.emit('ready', this);
			}
		}
	}, {
		key: "_initTexturesRemapIfNeeded",
		value: function _initTexturesRemapIfNeeded() {
			var remapNeeded = false;

			for (var texIdx = 0; texIdx < this.textures.length; ++texIdx) {
				var texture = this.textures[texIdx];

				if (texture.orig.x != 0 || texture.orig.y != 0 || texture.orig.width != texture.baseTexture.realWidth || texture.orig.height != texture.baseTexture.realHeight) {
					remapNeeded = true;
					break;
				}
			}

			this.texturesRemap = [];
			if (remapNeeded) {
				for (var texIdx = 0; texIdx < this.textures.length; ++texIdx) {
					var texture = this.textures[texIdx];

					this.texturesRemap[texIdx] = new this.ctx.neutrino.SubRect(texture.orig.x / texture.baseTexture.realWidth, 1.0 - (texture.orig.y + texture.orig.height) / texture.baseTexture.realHeight, texture.orig.width / texture.baseTexture.realWidth, texture.orig.height / texture.baseTexture.realHeight);
				}
			}
		}
	}]);

	return PIXINeutrinoEffectModel;
}(PIXI.DisplayObject);

var PIXINeutrinoMaterials = function () {
	function PIXINeutrinoMaterials(ctx) {
		_classCallCheck(this, PIXINeutrinoMaterials);

		this.ctx = ctx;
		this.renderer = ctx.renderer;
		var gl = this.renderer.gl;

		var vertexShaderSource = "\
/* NeutrinoParticles Vertex Shader */ \n\
attribute vec3 aVertexPosition;\n\
attribute vec4 aColor; \n\
attribute vec2 aTextureCoord;\n\
\n\
uniform mat3 projectionMatrix;\n\
uniform mat3 worldMatrix;\n\
\n\
varying vec4 vColor;\n\
varying vec2 vTextureCoord;\n\
\n\
void main(void) {\n\
	gl_Position = vec4((projectionMatrix * worldMatrix * vec3(aVertexPosition.xy, 1)).xy, 0, 1);\n\
	vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n\
	vTextureCoord = vec2(aTextureCoord.x, 1.0 - aTextureCoord.y);\n\
}";

		var fragmentShaderSource = "\
/* NeutrinoParticles Fragment Shader (Normal, Add materials) */ \n\
precision mediump float;\n\
\n\
varying vec4 vColor;\n\
varying vec2 vTextureCoord;\n\
\n\
uniform sampler2D uSampler;\n\
\n\
void main(void) {\n\
	gl_FragColor = vColor * texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n\
}";

		var fragmentShaderMultiplySource = "\
/* NeutrinoParticles Fragment Shader (Multiply material) */ \n\
precision mediump float;\n\
\n\
varying vec4 vColor;\n\
varying vec2 vTextureCoord;\n\
\n\
uniform sampler2D uSampler;\n\
\n\
void main(void)\n\
{\n\
	vec4 texel = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n\
	vec3 rgb = vColor.rgb * texel.rgb;\n\
	float alpha = vColor.a * texel.a;\n\
	gl_FragColor = vec4(mix(vec3(1, 1, 1), rgb, alpha), 1);\n\
}";

		this.shader = new PIXI.Shader(gl, vertexShaderSource, fragmentShaderSource);
		this.shaderMultiply = new PIXI.Shader(gl, vertexShaderSource, fragmentShaderSource);
		this.currentShader = null;
	}

	_createClass(PIXINeutrinoMaterials, [{
		key: "shutdown",
		value: function shutdown() {}
	}, {
		key: "positionAttrib",
		value: function positionAttrib() {
			return this.shader.attributes.aVertexPosition;
		}
	}, {
		key: "colorAttrib",
		value: function colorAttrib() {
			return this.shader.attributes.aColor;
		}
	}, {
		key: "texAttrib",
		value: function texAttrib(index) {
			return this.shader.attributes.aTextureCoord;
		}
	}, {
		key: "setup",
		value: function setup(worldMatrixArray) {
			this.worldMatrix = worldMatrixArray;
			this.currentShader = null;
		}
	}, {
		key: "switchToNormal",
		value: function switchToNormal(premultiplied) {
			this._setShader(this.shader);
			this.renderer.state.setBlendMode(PIXI.utils.correctBlendMode(0, premultiplied));
		}
	}, {
		key: "switchToAdd",
		value: function switchToAdd(premultiplied) {
			this._setShader(this.shader);
			this.renderer.state.setBlendMode(PIXI.utils.correctBlendMode(1, premultiplied));
		}
	}, {
		key: "switchToMultiply",
		value: function switchToMultiply(premultiplied) {
			this._setShader(this.shaderMultiply);
			this.renderer.state.setBlendMode(PIXI.utils.correctBlendMode(2, premultiplied));
		}
	}, {
		key: "_setShader",
		value: function _setShader(shader) {
			if (this.currentShader != shader) {
				this.renderer.bindShader(shader);
				shader.uniforms.uSampler = 0;
				shader.uniforms.worldMatrix = this.worldMatrix;

				this.currentShader = shader;
			}
		}
	}]);

	return PIXINeutrinoMaterials;
}();

var PIXINeutrinoRenderBuffers = function () {
	function PIXINeutrinoRenderBuffers(context, geometryBuffers) {
		_classCallCheck(this, PIXINeutrinoRenderBuffers);

		this.ctx = context;
		this.gl = this.ctx.renderer.gl;

		this.positions = null;
		this.colors = null;
		this.texCoords = [];
		this.maxNumVertices = 0;
		this.numVertices = 0;
		this.indices = null;

		this.renderCalls = [];
		this.maxNumRenderCalls = 0;
		this.numRenderCalls = 0;
	}

	_createClass(PIXINeutrinoRenderBuffers, [{
		key: "initialize",
		value: function initialize(maxNumVertices, texChannels, indices, maxNumRenderCalls) {
			var gl = this.gl;

			this.positions = new Float32Array(new ArrayBuffer(4 * maxNumVertices * 3));
			this.colors = new Uint8Array(new ArrayBuffer(4 * maxNumVertices));
			this.texCoords = [];
			for (var texChannel = 0; texChannel < texChannels.length; ++texChannel) {
				this.texCoords[texChannel] = new Float32Array(new ArrayBuffer(4 * maxNumVertices * texChannels[texChannel]));
				this.texCoords[texChannel].numComponents = texChannels[texChannel];
			}
			this.maxNumVertices = maxNumVertices;

			this.indices = new Uint16Array(new ArrayBuffer(2 * indices.length));
			this.indices.set(indices, 0);

			this.maxNumRenderCalls = maxNumRenderCalls;

			// set null vao to prevent overriding of it's buffers to next ones
			this.ctx.renderer.bindVao(null);

			this.positionBuffer = PIXI.glCore.GLBuffer.createVertexBuffer(gl, this.positions, gl.DYNAMIC_DRAW);

			this.colorBuffer = PIXI.glCore.GLBuffer.createVertexBuffer(gl, this.colors, gl.DYNAMIC_DRAW);

			this.texBuffers = [];
			for (var texIndex = 0; texIndex < this.texCoords.length; ++texIndex) {
				var buffer = PIXI.glCore.GLBuffer.createVertexBuffer(gl, this.texCoords[texIndex], gl.DYNAMIC_DRAW);
				this.texBuffers.push(buffer);
			}

			this.indicesBuffer = PIXI.glCore.GLBuffer.createIndexBuffer(gl, this.indices, gl.STATIC_DRAW);

			var materials = this.ctx.materials;

			this.vao = this.ctx.renderer.createVao().addIndex(this.indicesBuffer).addAttribute(this.positionBuffer, materials.positionAttrib(), gl.FLOAT, false, 0, 0).addAttribute(this.colorBuffer, materials.colorAttrib(), gl.UNSIGNED_BYTE, true, 0, 0);

			for (var texIndex = 0; texIndex < this.texCoords.length; ++texIndex) {
				this.vao.addAttribute(this.texBuffers[texIndex], materials.texAttrib(texIndex), gl.FLOAT, false, 0, 0);
			}
		}
	}, {
		key: "pushVertex",
		value: function pushVertex(vertex) {
			this.positions.set(vertex.position, this.numVertices * 3);
			this.colors.set(vertex.color, this.numVertices * 4);

			for (var texIndex = 0; texIndex < vertex.texCoords.length; ++texIndex) {
				this.texCoords[texIndex].set(vertex.texCoords[texIndex], this.numVertices * this.texCoords[texIndex].numComponents);
			}

			++this.numVertices;
		}
	}, {
		key: "pushRenderCall",
		value: function pushRenderCall(rc) {

			if (this.numRenderCalls >= this.renderCalls.length) this.renderCalls.push(Object.assign({}, rc));else Object.assign(this.renderCalls[this.numRenderCalls], rc);

			++this.numRenderCalls;
		}
	}, {
		key: "cleanup",
		value: function cleanup() {
			this.numVertices = 0;
			this.numRenderCalls = 0;
		}
	}, {
		key: "updateGlBuffers",
		value: function updateGlBuffers() {
			var gl = this.gl;

			if (this.numVertices > 0) {
				this.positionBuffer.upload(new Float32Array(this.positions.buffer, 0, this.numVertices * 3), 0);
				this.colorBuffer.upload(new Int32Array(this.colors.buffer, 0, this.numVertices), 0);

				this.texBuffers.forEach(function (buffer, index) {
					buffer.upload(new Float32Array(this.texCoords[index].buffer, 0, this.numVertices * this.texCoords[index].numComponents), 0);
				}, this);
			}
		}
	}, {
		key: "bind",
		value: function bind() {
			this.ctx.renderer.bindVao(this.vao);
		}
	}, {
		key: "draw",
		value: function draw(size, start) {
			var gl = this.gl;

			this.vao.draw(gl.TRIANGLES, size, start);
		}
	}, {
		key: "shutdown",
		value: function shutdown() {
			this.positionBuffer.destroy();
			this.colorBuffer.destroy();

			this.texBuffers.forEach(function (buffer) {
				buffer.destroy();
			}, this);
		}
	}]);

	return PIXINeutrinoRenderBuffers;
}();
//# sourceMappingURL=neutrinoparticles.pixi.js.map
;
    
}));