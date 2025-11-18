const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const Secao = require('./data/secao');
const Disciplina = require('./data/disciplina');
const Curso = require('./data/curso');
const Projeto = require('./data/projeto');
const Contato = require('./data/contato');

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

// ROTAS de vizualização

app.get('/', async (req, res) => {
    try {
        const secoes = await Secao.findAll({
            where: { ativo: true },
            order: [['ordem', 'ASC']]
        });
        res.render('index', { nome: estudante.nome, secoes });
    } catch (error) {
        console.error('Erro ao buscar seções:', error);
        res.render('index', { nome: estudante.nome, secoes: [] });
    }
});

app.get('/sobre', (req, res) => {
    res.render('sobre', { estudante });
});

app.get('/disciplinas', async (req, res) => {
    try {
        const disciplinas = await Disciplina.findAll({
            order: [['semestre', 'ASC'], ['ordem', 'ASC']]
        });
        res.render('disciplinas', { disciplinas });
    } catch (error) {
        console.error('Erro ao buscar disciplinas:', error);
        res.render('disciplinas', { disciplinas: [] });
    }
});

app.get('/projetos', async (req, res) => {
    try {
        const projetos = await Projeto.findAll({
            order: [['id', 'ASC']]
        });
        res.render('projetos', { projetos });
    } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        res.render('projetos', { projetos: [] });
    }
});

app.get('/cursos', async (req, res) => {
    try {
        const cursos = await Curso.findAll({
            order: [['ordem', 'ASC']]
        });
        res.render('cursos', { cursos });
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        res.render('cursos', { cursos: [] });
    }
});

app.get('/contato', async (req, res) => {
    try {
        const contatos = await Contato.findAll({
            order: [['ordem', 'ASC']]
        });
        res.render('contato', { contatos });
    } catch (error) {
        console.error('Erro ao buscar contatos:', error);
        res.render('contato', { contatos: [] });
    }
});

app.get('/dashboard', async (req, res) => {
    try {
        const projetos = await Projeto.findAll();
        const disciplinas = await Disciplina.findAll();

        const todasTecnologias = projetos.flatMap(p => p.tecnologias || []);
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
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        const estatisticas = {
            totalDisciplinas: 0,
            projetosConcluidos: 0,
            tecnologiasMaisUsadas: []
        };
        res.render('dashboard', { estatisticas });
    }
});

//CRUDs

app.get('/api/projetos', async (req, res) => {
    try {
        const projetos = await Projeto.findAll({
            order: [['id', 'ASC']]
        });
        res.json(projetos);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar projetos', erro: error.message });
    }
});

app.post('/api/projetos', async (req, res) => {
    try {
        const novoProjeto = await Projeto.create({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            papel: req.body.papel,
            detalhes: req.body.detalhes,
            tecnologias: req.body.tecnologias || [],
            link: req.body.link || null
        });
        res.status(201).json(novoProjeto);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar projeto', erro: error.message });
    }
});

app.put('/api/projetos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const projeto = await Projeto.findByPk(id);

        if (projeto) {
            await projeto.update({
                titulo: req.body.titulo || projeto.titulo,
                descricao: req.body.descricao || projeto.descricao,
                papel: req.body.papel || projeto.papel,
                detalhes: req.body.detalhes || projeto.detalhes,
                tecnologias: req.body.tecnologias || projeto.tecnologias,
                link: req.body.link !== undefined ? req.body.link : projeto.link
            });
            res.json(projeto);
        } else {
            res.status(404).json({ mensagem: 'Projeto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar projeto', erro: error.message });
    }
});

app.delete('/api/projetos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const projeto = await Projeto.findByPk(id);

        if (projeto) {
            await projeto.destroy();
            res.json({ mensagem: 'Projeto removido com sucesso', projeto });
        } else {
            res.status(404).json({ mensagem: 'Projeto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao deletar projeto', erro: error.message });
    }
});


app.get('/api/disciplinas', async (req, res) => {
    try {
        const disciplinas = await Disciplina.findAll({
            order: [['semestre', 'ASC'], ['ordem', 'ASC']]
        });
        res.json(disciplinas);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar disciplinas', erro: error.message });
    }
});

app.post('/api/disciplinas', async (req, res) => {
    try {
        const disciplinasMesmoSemestre = await Disciplina.count({
            where: { semestre: req.body.semestre }
        });

        const novaDisciplina = await Disciplina.create({
            nome: req.body.nome,
            semestre: req.body.semestre,
            ordem: req.body.ordem || disciplinasMesmoSemestre + 1
        });
        res.status(201).json(novaDisciplina);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar disciplina', erro: error.message });
    }
});

app.put('/api/disciplinas/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const disciplina = await Disciplina.findByPk(id);

        if (disciplina) {
            await disciplina.update({
                nome: req.body.nome || disciplina.nome,
                semestre: req.body.semestre || disciplina.semestre,
                ordem: req.body.ordem || disciplina.ordem
            });
            res.json(disciplina);
        } else {
            res.status(404).json({ mensagem: 'Disciplina não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar disciplina', erro: error.message });
    }
});

app.delete('/api/disciplinas/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const disciplina = await Disciplina.findByPk(id);

        if (disciplina) {
            await disciplina.destroy();
            res.json({ mensagem: 'Disciplina removida com sucesso', disciplina });
        } else {
            res.status(404).json({ mensagem: 'Disciplina não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao deletar disciplina', erro: error.message });
    }
});

app.get('/api/cursos', async (req, res) => {
    try {
        const cursos = await Curso.findAll({
            order: [['ordem', 'ASC']]
        });
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar cursos', erro: error.message });
    }
});

app.post('/api/cursos', async (req, res) => {
    try {
        const ultimaOrdem = await Curso.max('ordem') || 0;

        const novoCurso = await Curso.create({
            nome: req.body.nome,
            instituicao: req.body.instituicao,
            pdfUrl: req.body.pdfUrl || null,
            ordem: req.body.ordem || ultimaOrdem + 1
        });
        res.status(201).json(novoCurso);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar curso', erro: error.message });
    }
});

app.put('/api/cursos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const curso = await Curso.findByPk(id);

        if (curso) {
            await curso.update({
                nome: req.body.nome || curso.nome,
                instituicao: req.body.instituicao || curso.instituicao,
                pdfUrl: req.body.pdfUrl !== undefined ? req.body.pdfUrl : curso.pdfUrl,
                ordem: req.body.ordem || curso.ordem
            });
            res.json(curso);
        } else {
            res.status(404).json({ mensagem: 'Curso não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar curso', erro: error.message });
    }
});

app.delete('/api/cursos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const curso = await Curso.findByPk(id);

        if (curso) {
            await curso.destroy();
            res.json({ mensagem: 'Curso removido com sucesso', curso });
        } else {
            res.status(404).json({ mensagem: 'Curso não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao deletar curso', erro: error.message });
    }
});

app.get('/api/contatos', async (req, res) => {
    try {
        const contatos = await Contato.findAll({
            order: [['ordem', 'ASC']]
        });
        res.json(contatos);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar contatos', erro: error.message });
    }
});

app.post('/api/contatos', async (req, res) => {
    try {
        const ultimaOrdem = await Contato.max('ordem') || 0;

        const novoContato = await Contato.create({
            tipo: req.body.tipo,
            valor: req.body.valor,
            icone: req.body.icone || "/assets/image/pdf_icon.png",
            link: req.body.link || req.body.valor,
            ordem: req.body.ordem || ultimaOrdem + 1
        });
        res.status(201).json(novoContato);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar contato', erro: error.message });
    }
});

app.put('/api/contatos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const contato = await Contato.findByPk(id);

        if (contato) {
            await contato.update({
                tipo: req.body.tipo || contato.tipo,
                valor: req.body.valor || contato.valor,
                icone: req.body.icone || contato.icone,
                link: req.body.link !== undefined ? req.body.link : contato.link,
                ordem: req.body.ordem || contato.ordem
            });
            res.json(contato);
        } else {
            res.status(404).json({ mensagem: 'Contato não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar contato', erro: error.message });
    }
});

app.delete('/api/contatos/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const contato = await Contato.findByPk(id);

        if (contato) {
            await contato.destroy();
            res.json({ mensagem: 'Contato removido com sucesso', contato });
        } else {
            res.status(404).json({ mensagem: 'Contato não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao deletar contato', erro: error.message });
    }
});


app.get('/api/secoes', async (req, res) => {
    try {
        const secoes = await Secao.findAll({
            where: { ativo: true },
            order: [['ordem', 'ASC']]
        });
        res.json(secoes);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar seções', erro: error.message });
    }
});

app.post('/api/secoes', async (req, res) => {
    try {
        const ultimaOrdem = await Secao.max('ordem') || 0;

        const novaSecao = await Secao.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo || "",
            tipo: req.body.tipo || "personalizada",
            ativo: req.body.ativo !== undefined ? req.body.ativo : true,
            ordem: req.body.ordem || ultimaOrdem + 1
        });

        res.status(201).json(novaSecao);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar seção', erro: error.message });
    }
});

app.put('/api/secoes/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const secao = await Secao.findByPk(id);

        if (secao) {
            await secao.update({
                titulo: req.body.titulo || secao.titulo,
                conteudo: req.body.conteudo !== undefined ? req.body.conteudo : secao.conteudo,
                tipo: req.body.tipo || secao.tipo,
                ativo: req.body.ativo !== undefined ? req.body.ativo : secao.ativo,
                ordem: req.body.ordem || secao.ordem
            });
            res.json(secao);
        } else {
            res.status(404).json({ mensagem: 'Seção não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao atualizar seção', erro: error.message });
    }
});

app.delete('/api/secoes/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const secao = await Secao.findByPk(id);

        if (secao) {
            await secao.destroy();
            res.json({ mensagem: 'Seção removida com sucesso', secao });
        } else {
            res.status(404).json({ mensagem: 'Seção não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao deletar seção', erro: error.message });
    }
});

// BANCO de dados
const popularBanco = require('./data/base');

sequelize.sync({ alter: true })
    .then(async () => {
        await popularBanco();
    })
    .catch((error) => {
        console.error('❌ Erro ao conectar ao banco:', error);
    });

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});