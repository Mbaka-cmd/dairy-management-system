var CODE="MAZIWA-DEMO",IDLE=900000;
var ACC=[
{e:"manager@maziwa.demo",p:"Manager@2026",n:"Timothy Mwangi",r:["Manager"]},
{e:"clerk@maziwa.demo",p:"Clerk@2026",n:"James Rugendo",r:["Clerk"]},
{e:"quality@maziwa.demo",p:"Quality@2026",n:"Ann Muthoni",r:["Quality"]},
{e:"accountant@maziwa.demo",p:"Account@2026",n:"James Mwenda",r:["Accountant"]},
{e:"store@maziwa.demo",p:"Store@2026",n:"Lucy Kendi",r:["Store"]},
{e:"deputy@maziwa.demo",p:"Deputy@2026",n:"Mercy Mbaka",r:["Accountant","Quality"]},
{e:"0712000100",p:"1234",n:"Wanjiru Kinyua",r:["Farmer"],f:"F1"},
{e:"hotel@maziwa.demo",p:"Hotel@2026",n:"Mt Kenya Hotel",r:["Customer"]}];
var STAFF=["Manager","Clerk","Quality","Accountant","Store"];
var Auth={
login:function(role,id,pw,code){
 id=id.replace(/\s/g,"").toLowerCase();
 var L=JSON.parse(localStorage.getItem("mz_l")||"{}"),x=L[id]||{n:0,u:0};
 if(x.u>Date.now())return "Too many attempts. Try again in "+Math.ceil((x.u-Date.now())/1000)+" seconds.";
 var a=ACC.find(function(a){return a.e==id});
 var ok=a&&a.p===pw&&a.r.indexOf(role)>-1&&(STAFF.indexOf(role)<0||code===CODE);
 if(!ok){x.n++;if(x.n>=5){x.u=Date.now()+60000;x.n=0}L[id]=x;localStorage.setItem("mz_l",JSON.stringify(L));
  return "Sign-in failed. Check your details and that your account is authorised for this role."}
 delete L[id];localStorage.setItem("mz_l",JSON.stringify(L));
 sessionStorage.setItem("mz_s",JSON.stringify({e:id,r:role,t:Date.now()}));return ""},
session:function(touch){
 var s;try{s=JSON.parse(sessionStorage.getItem("mz_s"))}catch(e){}
 if(!s||Date.now()-s.t>IDLE)return null;
 var a=ACC.find(function(a){return a.e==s.e});
 if(!a||a.r.indexOf(s.r)<0)return null;
 if(touch!==false){s.t=Date.now();sessionStorage.setItem("mz_s",JSON.stringify(s))}return s},
switchTo:function(r,pw){
 var s=this.session(),a=s&&ACC.find(function(a){return a.e==s.e});
 if(!a||a.p!==pw||a.r.indexOf(r)<0)return false;
 s.r=r;s.t=Date.now();sessionStorage.setItem("mz_s",JSON.stringify(s));return true},
out:function(){sessionStorage.removeItem("mz_s");location.href="login.html"}};