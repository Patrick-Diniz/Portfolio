import projectDashboard from "@/assets/project-dashboard.webp";
import projectAutomation from "@/assets/project-automation.webp";
import projectPortal from "@/assets/project-portal.webp";

export const CV_URL =
  "https://drive.google.com/file/d/1YgNbnXKP43306sia4YMR7_wA9-rMpM8d/view";

export type CaseItem = {
  num: string;
  title: string;
  type: string;
  stack: string;
  image: string;
  problem: string;
  solution: string;
  result: string;
};

export const cases: CaseItem[] = [
  {
    num: "001",
    title: "Análise Contratual",
    type: "DADOS + BI",
    stack: "Power BI · SQL · Python",
    image: projectDashboard,
    problem:
      "Métricas de contratos espalhadas em planilhas manuais — sem visão consolidada de KPIs nem alertas de risco.",
    solution:
      "Dashboard interativo em Power BI com pipeline SQL + Python para consolidar, tratar e atualizar os dados automaticamente.",
    result:
      "Relatórios estratégicos em minutos e oportunidades identificadas por dado, não por intuição.",
  },
  {
    num: "002",
    title: "Automação de Fluxos",
    type: "AUTOMAÇÃO",
    stack: "Power Automate · Python · M365",
    image: projectAutomation,
    problem:
      "Geração de relatórios e gestão de tarefas 100% manuais, consumindo horas recorrentes da equipe de TI.",
    solution:
      "Fluxos em Power Automate orquestrados com scripts Python sobre o Microsoft 365, do gatilho à entrega.",
    result: "Trabalho manual recorrente eliminado do fluxo da equipe.",
  },
  {
    num: "003",
    title: "Portal de Chamados",
    type: "PRODUTO WEB",
    stack: "Vue.js 3 · GLPI 10 · Tailwind",
    image: projectPortal,
    problem:
      "A interface padrão do GLPI confundia usuários na abertura e no acompanhamento de tickets de TI.",
    solution:
      "Portal web em Vue.js 3 integrado a um backend customizado do GLPI 10, redesenhando o fluxo de ponta a ponta.",
    result:
      "Abertura de chamados simplificada e acompanhamento transparente.",
  },
];

export const marqueeItems = [
  "PYTHON",
  "POWER BI",
  "SQL",
  "POWER AUTOMATE",
  "VUE.JS",
  "EXCEL",
  "M365",
  "LINUX",
  "GIT",
  "GLPI",
  "TAILWIND",
  "JAVASCRIPT",
];

export const loves = ["Dados", "Automação", "Web", "Impacto"];

export const experiences = [
  { period: "2021—hoje", role: "Analista de Dados", company: "Setor de TI" },
  {
    period: "2021—hoje",
    role: "Desenvolvedor de Automações",
    company: "Power Automate & Python",
  },
  {
    period: "2022—2024",
    role: "Desenvolvedor Web",
    company: "Projetos Institucionais",
  },
];

export const education = [
  {
    period: "2023—2027",
    degree: "Licenciatura em Computação",
    institution: "IFRJ — Instituto Federal do Rio de Janeiro",
  },
  {
    period: "2019—2021",
    degree: "Técnico em Informática",
    institution: "Ensino Técnico",
  },
];

export const stackGroups = [
  { label: "DADOS", items: "Python · SQL · Power BI · Excel" },
  { label: "AUTOMAÇÃO", items: "Power Automate · M365 · GLPI" },
  { label: "WEB", items: "Vue.js · JavaScript · Tailwind" },
  { label: "BASE", items: "Git · Linux" },
];

export const contactLinks = [
  {
    meta: "EMAIL",
    label: "patricksdiniz@gmail.com",
    href: "mailto:patricksdiniz@gmail.com",
  },
  {
    meta: "REDE",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/diniz-patrick/",
  },
  { meta: "CÓDIGO", label: "GitHub", href: "https://github.com/Patrick-Diniz" },
  { meta: "PDF", label: "Currículo", href: CV_URL },
];
