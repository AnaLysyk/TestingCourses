import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"; // corrige import para Vite

// Função para carregar imagem pública como base64
const loadImageAsBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
  });
};

export const generatePDF = async (user, courses, hardSkills, softSkills, badges, kdRatio) => {
  const base64Image = await loadImageAsBase64("/testingCourse.png"); // do public

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    background: [
      {
        image: base64Image,
        width: 595,  // largura A4 em pontos
        height: 842, // altura A4
        opacity: 0.2,
      },
    ],
    content: [
      // Cabeçalho
      { text: `★ ${user.name}`, style: "header", alignment: "center" },
      { text: `▸ ${user.title}`, style: "subheader", alignment: "center", margin: [0, 0, 0, 5] },
      { text: user.description, alignment: "center", margin: [0, 0, 0, 10] },

      // Links clicáveis
      {
        columns: [
          { text: "GitHub", link: user.github, color: "blue", decoration: "underline", alignment: "center" },
          { text: "LinkedIn", link: user.linkedin, color: "blue", decoration: "underline", alignment: "center" },
          { text: "Instagram", link: user.instagram, color: "blue", decoration: "underline", alignment: "center" },
          { text: "Outros", link: user.other, color: "blue", decoration: "underline", alignment: "center" },
        ],
        columnGap: 5,
        margin: [0, 0, 0, 10],
      },

      // KD Ratio
      { text: `★ KD Ratio: ${kdRatio}`, margin: [0, 0, 0, 10], alignment: "center" },

      // Cursos concluídos
      { text: "▸ Cursos Concluídos", style: "sectionHeader" },
      { ul: courses.map(c => `⬤ ${c}`), margin: [0, 0, 0, 10] },

      // Hard Skills
      { text: "▸ Hard Skills", style: "sectionHeader" },
      {
        table: {
          widths: ["*", "auto"],
          body: hardSkills.map((s) => [`⬤ ${s.name}`, `LVL. ${s.level}`]),
        },
        layout: "lightHorizontalLines",
        margin: [0, 0, 0, 10],
      },

      // Soft Skills
      { text: "▸ Soft Skills", style: "sectionHeader" },
      {
        table: {
          widths: ["*", "auto"],
          body: softSkills.map((s) => [`⬤ ${s.name}`, `LVL. ${s.level}`]),
        },
        layout: "lightHorizontalLines",
        margin: [0, 0, 0, 10],
      },

      // Badges
      { text: "★ Badges", style: "sectionHeader" },
      {
        columns: badges.map((b) => ({
          text: `⬤ ${b.name}`,
          style: b.earned ? "earnedBadge" : "lockedBadge",
          margin: [0, 5, 0, 5],
        })),
        columnGap: 5,
        margin: [0, 0, 0, 10],
      },
    ],
    styles: {
      header: { fontSize: 22, bold: true },
      subheader: { fontSize: 16, italics: true },
      sectionHeader: { fontSize: 14, bold: true, margin: [0, 5, 0, 5] },
      earnedBadge: { color: "orange", bold: true },
      lockedBadge: { color: "gray", italics: true },
    },
  };

  pdfMake.createPdf(docDefinition).download(`${user.name}.pdf`);
};
