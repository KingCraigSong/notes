---
title: 你好，欢迎光临
---

# 👋 Hi, I'm KingCraigSong

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&width=435&lines=Welcome+to+my+GitHub+profile!;Passionate+developer;Keep+learning%2C+keep+building)]

---

## 🧑‍💻 About Me

- 🔭 I'm currently working on **something cool**
- 🌱 I'm currently learning **new technologies**
- 💬 Ask me about **anything tech-related**
- ⚡ Fun fact: **I love coding and exploring new tools**

---

## 🛠️ Tech Stack

![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vue](https://img.shields.io/badge/-Vue.js-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Git](https://img.shields.io/badge/-Git-F05032?style=flat-square&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github&logoColor=white)
![VS Code](https://img.shields.io/badge/-VS%20Code-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white)

---

## 📊 GitHub Stats

<div id="github-stats-container">
  <div class="stat-card" data-src="https://github-readme-stats.vercel.app/api?username=KingCraigSong&show_icons=true&theme=default&hide_title=true&count_private=true" data-alt="GitHub Stats"></div>
  <div class="stat-card" data-src="https://github-readme-stats.vercel.app/api/top-langs/?username=KingCraigSong&layout=compact&count_private=true&size_weight=0.5&count_weight=0.5" data-alt="Top Languages"></div>
  <div class="stat-card" data-src="https://streak-stats.demolab.com?user=KingCraigSong&theme=default" data-alt="GitHub Streak"></div>
  <div class="stat-card" data-src="https://github-readme-activity-graph.vercel.app/graph?username=KingCraigSong&theme=github" data-alt="Contribution Graph"></div>
</div>

<style>
#github-stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}
.stat-card {
  background: var(--bg-secondary, #f5f5f5);
  border-radius: 0.5rem;
  padding: 0.5rem;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-card img {
  width: 100%;
  height: auto;
  display: block;
}
.stat-card.loading {
  opacity: 0.5;
}
.stat-card.error {
  color: var(--text, #333);
  font-size: 0.875rem;
  text-align: center;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.stat-card');
  cards.forEach(card => {
    const src = card.dataset.src;
    const alt = card.dataset.alt;
    
    card.classList.add('loading');
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.width = '100%';
    img.style.height = 'auto';
    
    img.onload = () => {
      card.classList.remove('loading');
      card.innerHTML = '';
      card.appendChild(img);
    };
    
    img.onerror = () => {
      card.classList.remove('loading');
      card.classList.add('error');
      card.innerHTML = '<span>加载失败</span>';
    };
    
    card.appendChild(img);
  });
});
</script>

---

⭐️ **Thanks for visiting!** ⭐️
