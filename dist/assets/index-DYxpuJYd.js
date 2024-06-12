(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();document.querySelector("#app").innerHTML=`
 <div class="container mx-auto p-4">
    <div class="flex justify-end items-center mb-4">
      <label class="flex cursor-pointer gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
        <input type="checkbox" id="theme-toggle" class="toggle theme-controller" />
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
      </label>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <h1 class="text-2xl font-bold mb-4">Person anlegen</h1>
        <form id="person-form" class="space-y-4">
          <div>
            <label for="firstname" class="block text-sm font-medium">Vorname</label>
            <input type="text" id="firstname" class="input input-bordered w-full" />
          </div>
          <div>
            <label for="lastname" class="block text-sm font-medium">Nachname</label>
            <input type="text" id="lastname" class="input input-bordered w-full" />
          </div>
          <div>
            <label for="birthyear" class="block text-sm font-medium">Geburtsjahr</label>
            <input type="number" id="birthyear" class="input input-bordered w-full" />
          </div>
          <button type="submit" class="btn btn-secondary w-full">Hinzufügen</button>
        </form>
        <div class="mt-8">
          <h2 class="text-xl font-bold mb-4">Aktionen</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
            <button id="sort-lastname" class="btn w-full">Sortieren nach Nachname</button>
            <button id="sort-age" class="btn w-full">Sortieren nach Alter</button>
            </div>
            <div class="space-y-2">
            <button id="delete-last" class="btn w-full">Letztes Element löschen</button>
            <button id="delete-all" class="btn w-full">Alles löschen</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <table class="table w-full">
          <thead>
            <tr>
              <th>Vorname</th>
              <th>Nachname</th>
              <th>Geburtsjahr</th>
            </tr>
          </thead>
          <tbody id="person-list">
          </tbody>
        </table>
      </div>
    </div>
  </div>
`;const h=document.getElementById("theme-toggle");h.addEventListener("change",e=>{e.target.checked?document.documentElement.setAttribute("data-theme","synthwave"):document.documentElement.removeAttribute("data-theme")});const m=document.getElementById("person-form"),u=document.getElementById("person-list");let l=[],c=!1,d=null;const o=()=>{u.innerHTML="",l.forEach(e=>{const n=new Date().getFullYear()-e.birthyear,r=document.createElement("tr");r.innerHTML=`
      <td>${e.firstname}</td>
      <td>${e.lastname}</td>
      <td>${n}</td>
      <td>
      <button class="btn btn-circle btn-sm edit-person" data-id="${e.id}">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
        </svg>
      </button>
        <button class="btn btn-circle btn-sm delete-person" data-id="${e.id}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </td>
    `,u.appendChild(r)}),document.querySelectorAll(".edit-person").forEach(e=>{e.addEventListener("click",()=>{c=!0,d=e.dataset.id,p(d)})}),document.querySelectorAll(".delete-person").forEach(e=>{e.addEventListener("click",()=>f(e.dataset.id))})},f=e=>{l=l.filter(n=>n.id!=e),o()},p=e=>{const n=l.find(r=>r.id==e);n&&(document.getElementById("firstname").value=n.firstname,document.getElementById("lastname").value=n.lastname,document.getElementById("birthyear").value=n.birthyear)},b=e=>{e.preventDefault();const n=document.getElementById("firstname").value,r=document.getElementById("lastname").value,i=parseInt(document.getElementById("birthyear").value);if(c){const t=l.find(s=>s.id==d);t&&(t.firstname=n,t.lastname=r,t.birthyear=i,c=!1,d=null)}else{const t={id:l.length,firstname:n,lastname:r,birthyear:parseInt(i)};l.push(t)}o(),m.reset()};document.getElementById("sort-lastname").addEventListener("click",()=>{l.sort((e,n)=>e.lastname.localeCompare(n.lastname)),o()});document.getElementById("sort-age").addEventListener("click",()=>{l.sort((e,n)=>e.birthyear-n.birthyear),o()});document.getElementById("delete-last").addEventListener("click",()=>{l.pop(),o()});document.getElementById("delete-all").addEventListener("click",()=>{l=[],o()});m.addEventListener("submit",b);
