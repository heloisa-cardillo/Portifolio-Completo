const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'public/core')
]);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use('/app', express.static(path.join(__dirname, 'app')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const estudante = {
    nome: "Heloisa Cardillo",
    nomeCompleto: "Heloisa Cardillo Lima",
    curso: "Desenvolvimento de Software Multiplataformas",
    instituicao: "FATEC São José dos Campos",
    anoIngresso: 2025
};

let disciplinas = [
    {
        id: 1,
        nome: "Modelagem de Banco de Dados",
        semestre: "1º Semestre - 2025",
        ordem: 1
    },
    {
        id: 2,
        nome: "Desenvolvimento Web I",
        semestre: "1º Semestre - 2025",
        ordem: 2
    },
    {
        id: 3,
        nome: "Algoritmo e Lógica de Programação",
        semestre: "1º Semestre - 2025",
        ordem: 3
    },
    {
        id: 4,
        nome: "Engenharia de Software I",
        semestre: "1º Semestre - 2025",
        ordem: 4
    },
    {
        id: 5,
        nome: "Design Digital",
        semestre: "1º Semestre - 2025",
        ordem: 5
    },
    {
        id: 6,
        nome: "Sistemas Operacionais e Redes de Computadores",
        semestre: "1º Semestre - 2025",
        ordem: 6
    },
    {
        id: 7,
        nome: "Banco de Dados Relacional",
        semestre: "2º Semestre - 2025",
        ordem: 1
    },
    {
        id: 8,
        nome: "Desenvolvimento Web II",
        semestre: "2º Semestre - 2025",
        ordem: 2
    },
    {
        id: 9,
        nome: "Técnicas de Programação I",
        semestre: "2º Semestre - 2025",
        ordem: 3
    },
    {
        id: 10,
        nome: "Engenharia de Software II",
        semestre: "2º Semestre - 2025",
        ordem: 4
    },
    {
        id: 11,
        nome: "Estrutura de Dados",
        semestre: "2º Semestre - 2025",
        ordem: 5
    },
    {
        id: 12,
        nome: "Matemática para Computação",
        semestre: "2º Semestre - 2025",
        ordem: 6
    }
];

let cursos = [
    {
        id: 1,
        nome: "Escola dos Inovadores",
        instituicao: "Inova CPS (Fatec)",
        pdfUrl: "/assets/pdfs/CERTIFICADO_-_2025-1.pdf",
        ordem: 1
    },
    {
        id: 2,
        nome: "Orientação a Objetos com Kotlin",
        instituicao: "DIO",
        pdfUrl: "/assets/pdfs/orientacao a objetos.pdf",
        ordem: 2
    },
    {
        id: 3,
        nome: "Princípios de Interface de Usuário e Layouts Android",
        instituicao: "DIO",
        pdfUrl: "/assets/pdfs/layouts.pdf",
        ordem: 3
    },
    {
        id: 4,
        nome: "Desenvolvimento Moderno de Software",
        instituicao: "DIO",
        pdfUrl: "/assets/pdfs/introdução software.pdf",
        ordem: 4
    },
    {
        id: 5,
        nome: "Desafios de Código",
        instituicao: "DIO",
        pdfUrl: "/assets/pdfs/desafio de codigo.pdf",
        ordem: 5
    },
    {
        id: 6,
        nome: "Lógica de Programação Essencial",
        instituicao: "DIO",
        pdfUrl: "/assets/pdfs/logica de programacao.pdf",
        ordem: 6
    },
    {
        id: 7,
        nome: "Versionamento de Código com Git e GitHub",
        instituicao: "DIO",
        pdfUrl: "/assets/pdfs/git e github.pdf",
        ordem: 7
    },
    {
        id: 8,
        nome: "Estrutura de Dados e Algoritmos",
        instituicao: "DIO",
        pdfUrl: "/assets/pdfs/modelagem de dados.pdf",
        ordem: 8
    },
    {
        id: 9,
        nome: "Equipes Ágeis",
        instituicao: "DIO",
        pdfUrl: "/assets/pdfs/equipes ageis.pdf",
        ordem: 9
    },
    {
        id: 10,
        nome: "Princípios de Desenvolvimento de Software",
        instituicao: "DIO",
        pdfUrl: "/assets/pdfs/desenvolvimento software.pdf",
        ordem: 10
    }
];

let projetos = [
    {
        id: 1,
        titulo: "API 1º Semestre 2025",
        descricao: "Criação de um site com banco de dados mostrando os principais produtos importados e exportados nos municípios de São Paulo.",
        papel: "Desenvolvedora Front-End",
        detalhes: "Criação do protótipo visual no Figma e implementação de um gráfico em formato de funil com Chart.js e CSS.",
        tecnologias: ["pandas", "Google Colab", "GitHub", "CSS", "HTML", "JavaScript", "Chart.js"]
    },
    {
        id: 2,
        titulo: "API 2º Semestre 2025",
        descricao: "Criação de uma plataforma única que centralize e padronize processos administrativos, comerciais e operacionais da empresa Newe Log.",
        papel: "Product Owner e Desenvolvedora Front-End",
        detalhes: "Criação e gerenciamento do backlog do produto, definição de prioridades, negociação com cliente, acompanhamento das sprints, elaboração de wireframes e implementação de funcionalidades no front-end.",
        tecnologias: ["HTML", "JavaScript", "CSS", "Typescript", "NodeJS", "React", "Git", "Figma", "Jira"]
    },
    {
        id: 3,
        titulo: "Site Centro de Memórias Fatec",
        descricao: "Reestruturação do código da página Centro de Memória do site da Fatec São José dos Campos.",
        papel: "Desenvolvedora Front-End e de Software",
        detalhes: "Aprimoramento do layout e interatividade da interface para torná-la mais moderna, atrativa e funcional.",
        tecnologias: ["HTML", "CSS", "JavaScript"],
        link: "https://heloisa-cardillo.github.io/site-memoria/"
    },
    {
        id: 4,
        titulo: "Aplicativo Julius Tracker",
        descricao: "Aplicativo para auxiliar no acompanhamento da rotina de medicação.",
        papel: "Desenvolvedora",
        detalhes: "Permite registro de data, medicamento e dosagem, organizando em rotina diária.",
        tecnologias: ["Android Studio", "Kotlin", "Figma"]
    }
];

let contatos = [
    {
        id: 1,
        tipo: "Email",
        valor: "heloisacardillo@gmail.com",
        icone: "/assets/image/gmail_icon.png",
        link: "mailto:heloisacardillo@gmail.com",
        ordem: 1
    },
    {
        id: 2,
        tipo: "LinkedIn",
        valor: "https://www.linkedin.com/in/heloisa-cardillo-lima/",
        icone: "/assets/image/linkedin_icon.png",
        link: "https://www.linkedin.com/in/heloisa-cardillo-lima/",
        ordem: 2
    },
    {
        id: 3,
        tipo: "GitHub",
        valor: "https://github.com/heloisa-cardillo",
        icone: "/assets/image/github_icon.png",
        link: "https://github.com/heloisa-cardillo",
        ordem: 3
    },
    {
        id: 4,
        tipo: "Currículo",
        valor: "/assets/pdfs/Heloisa Cardillo CV.pdf",
        icone: "/assets/image/curriculo.png",
        link: "/assets/pdfs/Heloisa Cardillo CV.pdf",
        ordem: 4
    }
];

let secoes = [
    {
        id: 1,
        titulo: "Um pouco sobre mim",
        conteudo: "",
        tipo: "sobre",
        ativo: true,
        ordem: 1
    }
];

// ROTAS DE VISUALIZAÇÃO

app.get('/', (req, res) => {
    res.render('index', { nome: estudante.nome, secoes });
});

app.get('/sobre', (req, res) => {
    res.render('sobre', { estudante });
});

app.get('/disciplinas', (req, res) => {
    res.render('disciplinas', { disciplinas });
});

app.get('/projetos', (req, res) => {
    res.render('projetos', { projetos });
});

app.get('/cursos', (req, res) => {
    res.render('cursos', { cursos });
});

app.get('/contato', (req, res) => {
    res.render('contato', { contatos });
});

app.get('/dashboard', (req, res) => {
    const todasTecnologias = projetos.flatMap(p => p.tecnologias);
    const contagemTecnologias = {};

    todasTecnologias.forEach(tech => {
        contagemTecnologias[tech] = (contagemTecnologias[tech] || 0) + 1;
    });

    const tecnologiasOrdenadas = Object.entries(contagemTecnologias)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const estatisticas = {
        totalDisciplinas: disciplinas.length,
        projetosConcluidos: projetos.length,
        tecnologiasMaisUsadas: tecnologiasOrdenadas
    };

    res.render('dashboard', { estatisticas });
});

// CRUD PROJETOS

app.get('/api/projetos', (req, res) => {
    res.json(projetos);
});

app.post('/api/projetos', (req, res) => {
    const novoProjeto = {
        id: projetos.length > 0 ? Math.max(...projetos.map(p => p.id)) + 1 : 1,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        papel: req.body.papel,
        detalhes: req.body.detalhes,
        tecnologias: req.body.tecnologias || [],
        link: req.body.link || null
    };
    projetos.push(novoProjeto);
    res.status(201).json(novoProjeto);
});

app.put('/api/projetos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = projetos.findIndex(p => p.id === id);

    if (index !== -1) {
        projetos[index] = {
            id: id,
            titulo: req.body.titulo || projetos[index].titulo,
            descricao: req.body.descricao || projetos[index].descricao,
            papel: req.body.papel || projetos[index].papel,
            detalhes: req.body.detalhes || projetos[index].detalhes,
            tecnologias: req.body.tecnologias || projetos[index].tecnologias,
            link: req.body.link !== undefined ? req.body.link : projetos[index].link
        };
        res.json(projetos[index]);
    } else {
        res.status(404).json({ mensagem: 'Projeto não encontrado' });
    }
});

app.delete('/api/projetos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = projetos.findIndex(p => p.id === id);

    if (index !== -1) {
        const projetoRemovido = projetos.splice(index, 1);
        res.json({ mensagem: 'Projeto removido com sucesso', projeto: projetoRemovido });
    } else {
        res.status(404).json({ mensagem: 'Projeto não encontrado' });
    }
});

// CRUD DISCIPLINAS

app.get('/api/disciplinas', (req, res) => {
    res.json(disciplinas);
});

app.post('/api/disciplinas', (req, res) => {
    const novaDisciplina = {
        id: disciplinas.length > 0 ? Math.max(...disciplinas.map(d => d.id)) + 1 : 1,
        nome: req.body.nome,
        semestre: req.body.semestre,
        ordem: req.body.ordem || disciplinas.filter(d => d.semestre === req.body.semestre).length + 1
    };
    disciplinas.push(novaDisciplina);
    res.status(201).json(novaDisciplina);
});

app.put('/api/disciplinas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = disciplinas.findIndex(d => d.id === id);

    if (index !== -1) {
        disciplinas[index] = {
            id: id,
            nome: req.body.nome || disciplinas[index].nome,
            semestre: req.body.semestre || disciplinas[index].semestre,
            ordem: req.body.ordem || disciplinas[index].ordem
        };
        res.json(disciplinas[index]);
    } else {
        res.status(404).json({ mensagem: 'Disciplina não encontrada' });
    }
});

app.delete('/api/disciplinas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = disciplinas.findIndex(d => d.id === id);

    if (index !== -1) {
        const disciplinaRemovida = disciplinas.splice(index, 1);
        res.json({ mensagem: 'Disciplina removida com sucesso', disciplina: disciplinaRemovida });
    } else {
        res.status(404).json({ mensagem: 'Disciplina não encontrada' });
    }
});

// CRUD CURSOS

app.get('/api/cursos', (req, res) => {
    res.json(cursos);
});

app.post('/api/cursos', (req, res) => {
    const novoCurso = {
        id: cursos.length > 0 ? Math.max(...cursos.map(c => c.id)) + 1 : 1,
        nome: req.body.nome,
        instituicao: req.body.instituicao,
        pdfUrl: req.body.pdfUrl || null,
        ordem: req.body.ordem || cursos.length + 1
    };
    cursos.push(novoCurso);
    res.status(201).json(novoCurso);
});

app.put('/api/cursos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cursos.findIndex(c => c.id === id);

    if (index !== -1) {
        cursos[index] = {
            id: id,
            nome: req.body.nome || cursos[index].nome,
            instituicao: req.body.instituicao || cursos[index].instituicao,
            pdfUrl: req.body.pdfUrl !== undefined ? req.body.pdfUrl : cursos[index].pdfUrl,
            ordem: req.body.ordem || cursos[index].ordem
        };
        res.json(cursos[index]);
    } else {
        res.status(404).json({ mensagem: 'Curso não encontrado' });
    }
});

app.delete('/api/cursos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cursos.findIndex(c => c.id === id);

    if (index !== -1) {
        const cursoRemovido = cursos.splice(index, 1);
        res.json({ mensagem: 'Curso removido com sucesso', curso: cursoRemovido });
    } else {
        res.status(404).json({ mensagem: 'Curso não encontrado' });
    }
});

// CRUD CONTATOS

app.get('/api/contatos', (req, res) => {
    res.json(contatos);
});

app.post('/api/contatos', (req, res) => {
    const novoContato = {
        id: contatos.length > 0 ? Math.max(...contatos.map(c => c.id)) + 1 : 1,
        tipo: req.body.tipo,
        valor: req.body.valor,
        icone: req.body.icone || "/assets/image/pdf_icon.png",
        link: req.body.link || req.body.valor,
        ordem: req.body.ordem || contatos.length + 1
    };
    contatos.push(novoContato);
    res.status(201).json(novoContato);
});

app.put('/api/contatos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = contatos.findIndex(c => c.id === id);

    if (index !== -1) {
        contatos[index] = {
            id: id,
            tipo: req.body.tipo || contatos[index].tipo,
            valor: req.body.valor || contatos[index].valor,
            icone: req.body.icone || contatos[index].icone,
            link: req.body.link !== undefined ? req.body.link : contatos[index].link,
            ordem: req.body.ordem || contatos[index].ordem
        };
        res.json(contatos[index]);
    } else {
        res.status(404).json({ mensagem: 'Contato não encontrado' });
    }
});

app.delete('/api/contatos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = contatos.findIndex(c => c.id === id);

    if (index !== -1) {
        const contatoRemovido = contatos.splice(index, 1);
        res.json({ mensagem: 'Contato removido com sucesso', contato: contatoRemovido });
    } else {
        res.status(404).json({ mensagem: 'Contato não encontrado' });
    }
});

// CRUD SEÇÕES

app.get('/api/secoes', (req, res) => {
    res.json(secoes);
});

app.post('/api/secoes', (req, res) => {
    const novaSecao = {
        id: secoes.length > 0 ? Math.max(...secoes.map(s => s.id)) + 1 : 1,
        titulo: req.body.titulo,
        conteudo: req.body.conteudo || "",
        tipo: req.body.tipo || "personalizada",
        ativo: req.body.ativo !== undefined ? req.body.ativo : true,
        ordem: req.body.ordem || secoes.length + 1
    };
    secoes.push(novaSecao);
    res.status(201).json(novaSecao);
});

app.put('/api/secoes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = secoes.findIndex(s => s.id === id);

    if (index !== -1) {
        secoes[index] = {
            id: id,
            titulo: req.body.titulo || secoes[index].titulo,
            conteudo: req.body.conteudo !== undefined ? req.body.conteudo : secoes[index].conteudo,
            tipo: req.body.tipo || secoes[index].tipo,
            ativo: req.body.ativo !== undefined ? req.body.ativo : secoes[index].ativo,
            ordem: req.body.ordem || secoes[index].ordem
        };
        res.json(secoes[index]);
    } else {
        res.status(404).json({ mensagem: 'Seção não encontrada' });
    }
});

app.delete('/api/secoes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = secoes.findIndex(s => s.id === id);

    if (index !== -1) {
        const secaoRemovida = secoes.splice(index, 1);
        res.json({ mensagem: 'Seção removida com sucesso', secao: secaoRemovida });
    } else {
        res.status(404).json({ mensagem: 'Seção não encontrada' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
