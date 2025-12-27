/* ====================== Scroll Reveal ====================== */
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
  const windowHeight = window.innerHeight;
  reveals.forEach(el=>{
    const top = el.getBoundingClientRect().top;
    if(top<windowHeight-100){el.classList.add("active");}
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* ====================== Load Projects from JSON ====================== */
async function loadProjects(){
  const container = document.getElementById('projects-container');
  if(!container) return;
  try{
    const res = await fetch('./projects.json');
    if(!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const projects = await res.json();
    container.innerHTML='';
    projects.forEach(project=>{
      const card = document.createElement('div');
      card.className='card project';
      card.innerHTML=`<h3>${project.title}</h3><p>${project.description}</p><a href="${project.link}" target="_blank">GitHub</a>`;
      container.appendChild(card);
    });
  }catch(error){
    console.error("Failed to load projects:", error);
    container.innerHTML=`<p style="color:red;">Failed to load projects. Check console for details.</p>`;
  }
}
loadProjects();
