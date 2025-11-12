const Disciplina = require('./disciplina');
const Curso = require('./curso');
const Projeto = require('./projeto');
const Contato = require('./contato');

//DADOS pré existentes
async function popularBanco() {
    try {
        const totalDisciplinas = await Disciplina.count();
        const totalCursos = await Curso.count();
        const totalProjetos = await Projeto.count();
        const totalContatos = await Contato.count();

        if (totalDisciplinas > 0 && totalCursos > 0 && totalProjetos > 0 && totalContatos > 0) {
            console.log('✅ Banco de dados já possui dados!');
            return;
        }

        console.log('📦 Populando banco de dados...');

        if (totalDisciplinas === 0) {
            await Disciplina.bulkCreate([
                { nome: "Modelagem de Banco de Dados", semestre: "1º Semestre - 2025", ordem: 1 },
                { nome: "Desenvolvimento Web I", semestre: "1º Semestre - 2025", ordem: 2 },
                { nome: "Algoritmo e Lógica de Programação", semestre: "1º Semestre - 2025", ordem: 3 },
                { nome: "Engenharia de Software I", semestre: "1º Semestre - 2025", ordem: 4 },
                { nome: "Design Digital", semestre: "1º Semestre - 2025", ordem: 5 },
                { nome: "Sistemas Operacionais e Redes de Computadores", semestre: "1º Semestre - 2025", ordem: 6 },
                { nome: "Banco de Dados Relacional", semestre: "2º Semestre - 2025", ordem: 1 },
                { nome: "Desenvolvimento Web II", semestre: "2º Semestre - 2025", ordem: 2 },
                { nome: "Técnicas de Programação I", semestre: "2º Semestre - 2025", ordem: 3 },
                { nome: "Engenharia de Software II", semestre: "2º Semestre - 2025", ordem: 4 },
                { nome: "Estrutura de Dados", semestre: "2º Semestre - 2025", ordem: 5 },
                { nome: "Matemática para Computação", semestre: "2º Semestre - 2025", ordem: 6 }
            ]);
            console.log('✅ Disciplinas inseridas!');
        }

        if (totalCursos === 0) {
            await Curso.bulkCreate([
                { nome: "Escola dos Inovadores", instituicao: "Inova CPS (Fatec)", pdfUrl: "/assets/pdfs/CERTIFICADO_-_2025-1.pdf", ordem: 1 },
                { nome: "Orientação a Objetos com Kotlin", instituicao: "DIO", pdfUrl: "/assets/pdfs/orientacao a objetos.pdf", ordem: 2 },
                { nome: "Princípios de Interface de Usuário e Layouts Android", instituicao: "DIO", pdfUrl: "/assets/pdfs/layouts.pdf", ordem: 3 },
                { nome: "Desenvolvimento Moderno de Software", instituicao: "DIO", pdfUrl: "/assets/pdfs/introdução software.pdf", ordem: 4 },
                { nome: "Desafios de Código", instituicao: "DIO", pdfUrl: "/assets/pdfs/desafio de codigo.pdf", ordem: 5 },
                { nome: "Lógica de Programação Essencial", instituicao: "DIO", pdfUrl: "/assets/pdfs/logica de programacao.pdf", ordem: 6 },
                { nome: "Versionamento de Código com Git e GitHub", instituicao: "DIO", pdfUrl: "/assets/pdfs/git e github.pdf", ordem: 7 },
                { nome: "Estrutura de Dados e Algoritmos", instituicao: "DIO", pdfUrl: "/assets/pdfs/modelagem de dados.pdf", ordem: 8 },
                { nome: "Equipes Ágeis", instituicao: "DIO", pdfUrl: "/assets/pdfs/equipes ageis.pdf", ordem: 9 },
                { nome: "Princípios de Desenvolvimento de Software", instituicao: "DIO", pdfUrl: "/assets/pdfs/desenvolvimento software.pdf", ordem: 10 }
            ]);
            console.log('✅ Cursos inseridos!');
        }

        if (totalProjetos === 0) {
            await Projeto.bulkCreate([
                {
                    titulo: "API 1º Semestre 2025",
                    descricao: "Criação de um site com banco de dados mostrando os principais produtos importados e exportados nos municípios de São Paulo.",
                    papel: "Desenvolvedora Front-End",
                    detalhes: "Criação do protótipo visual no Figma e implementação de um gráfico em formato de funil com Chart.js e CSS.",
                    tecnologias: ["pandas", "Google Colab", "GitHub", "CSS", "HTML", "JavaScript", "Chart.js"]
                },
                {
                    titulo: "API 2º Semestre 2025",
                    descricao: "Criação de uma plataforma única que centralize e padronize processos administrativos, comerciais e operacionais da empresa Newe Log.",
                    papel: "Product Owner e Desenvolvedora Front-End",
                    detalhes: "Criação e gerenciamento do backlog do produto, definição de prioridades, negociação com cliente, acompanhamento das sprints, elaboração de wireframes e implementação de funcionalidades no front-end.",
                    tecnologias: ["HTML", "JavaScript", "CSS", "Typescript", "NodeJS", "React", "Git", "Figma", "Jira"]
                },
                {
                    titulo: "Site Centro de Memórias Fatec",
                    descricao: "Reestruturação do código da página Centro de Memória do site da Fatec São José dos Campos.",
                    papel: "Desenvolvedora Front-End e de Software",
                    detalhes: "Aprimoramento do layout e interatividade da interface para torná-la mais moderna, atrativa e funcional.",
                    tecnologias: ["HTML", "CSS", "JavaScript"],
                    link: "https://heloisa-cardillo.github.io/site-memoria/"
                },
                {
                    titulo: "Aplicativo Julius Tracker",
                    descricao: "Aplicativo para auxiliar no acompanhamento da rotina de medicação.",
                    papel: "Desenvolvedora",
                    detalhes: "Permite registro de data, medicamento e dosagem, organizando em rotina diária.",
                    tecnologias: ["Android Studio", "Kotlin", "Figma"]
                }
            ]);
            console.log('✅ Projetos inseridos!');
        }

        if (totalContatos === 0) {
            await Contato.bulkCreate([
                { tipo: "Email", valor: "heloisacardillo@gmail.com", icone: "/assets/image/gmail_icon.png", link: "mailto:heloisacardillo@gmail.com", ordem: 1 },
                { tipo: "LinkedIn", valor: "https://www.linkedin.com/in/heloisa-cardillo-lima/", icone: "/assets/image/linkedin_icon.png", link: "https://www.linkedin.com/in/heloisa-cardillo-lima/", ordem: 2 },
                { tipo: "GitHub", valor: "https://github.com/heloisa-cardillo", icone: "/assets/image/github_icon.png", link: "https://github.com/heloisa-cardillo", ordem: 3 },
                { tipo: "Currículo", valor: "/assets/pdfs/Heloisa Cardillo CV.pdf", icone: "/assets/image/curriculo.png", link: "/assets/pdfs/Heloisa Cardillo CV.pdf", ordem: 4 }
            ]);
            console.log('✅ Contatos inseridos!');
        }

        console.log('🎉 Banco de dados populado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao popular banco:', error);
    }
}

module.exports = popularBanco;