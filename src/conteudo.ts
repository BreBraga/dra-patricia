// Conteúdo único das landings. Tudo vem do briefing de 28/10/2026.
// Itens marcados com PENDENTE ainda não foram enviados pela cliente.
// A Clínica Vínculo não aparece no site (decisão de 03/11/2026).

export const contato = {
  whatsapp: '5524000000000', // PENDENTE: número de agendamento
  whatsappExibicao: '(24) 00000-0000', // PENDENTE
  endereco: 'Rua Exemplo, 000 · Volta Redonda, RJ', // PENDENTE
  enderecoCurto: 'Rua Exemplo, 000 · Volta Redonda', // PENDENTE
  horarios: 'Segunda a sexta, 8h às 18h', // PENDENTE
  instagram: 'https://instagram.com/', // PENDENTE
  crm: 'CRM-RJ 00000', // PENDENTE
  rqe: 'RQE 00000', // PENDENTE
  cidade: 'Volta Redonda', // PENDENTE: confirmar cidades no site e no Google
}

export function linkWhatsApp(mensagem?: string) {
  const base = `https://wa.me/${contato.whatsapp}`
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base
}

export const menu = [
  { id: 'sobre', rotulo: 'Sobre mim' },
  { id: 'servicos', rotulo: 'Serviços' },
  { id: 'consultorio', rotulo: 'Consultório' },
  { id: 'abordagem', rotulo: 'Minha abordagem' },
  { id: 'duvidas', rotulo: 'Dúvidas' },
  { id: 'contato', rotulo: 'Contato' },
] as const

export const sobre = {
  paragrafos: [
    'Sou uma mulher movida por intuição, observação, sonhos e ações. Na vida pessoal, sou mãe do Miguel e da Marina e esposa do Rodrigo.',
    'Há 16 anos me dedico à pediatria. Minha prática é fundamentada em uma medicina que valoriza o ser humano em sua integralidade.',
    'Minha missão é construir uma parceria sólida com você na jornada da parentalidade, oferecendo um cuidado consciente, empático e que traga leveza para o dia a dia da sua família.',
    'Acredito que cuidar pode ser leve e satisfatório, e que posso ser sua rede de apoio, junto a uma excelente equipe multidisciplinar. Seja bem-vindo(a)!',
  ],
  formacao: [
    { titulo: 'Residência', texto: 'Pediatria e Neonatologia' },
    { titulo: 'Mestrado', texto: 'Pesquisa Aplicada à Saúde da Criança e do Adolescente, Instituto Fernandes Figueira (IFF/Fiocruz)' },
    { titulo: 'Capacitação', texto: 'Diretrizes de Reanimação Neonatal da SBP (termo e prematuro)' },
    { titulo: 'Ensino', texto: 'Professora assistente de Saúde da Criança e do Adolescente, Universidade de Vassouras' },
  ],
  /** Versões curtas da formação, para selos (B e C). */
  credenciais: ['Pediatria e Neonatologia', 'Mestrado IFF/Fiocruz', 'Reanimação neonatal SBP', 'Professora na Univ. de Vassouras'],
}


export type Servico = {
  slug: string
  nome: string
  frase: string
  resumo: string
  area: string
}

export const servicos: Servico[] = [
  { slug: 'pre-natal', nome: 'Pré-natal pediátrico', area: 'Comece por aqui', frase: 'O cuidado começa antes do nascimento.', resumo: 'Conheça a pediatra que vai receber seu bebê e saia com um plano para o parto e os primeiros dias. Entre 28 e 34 semanas, presencial ou online.' },
  { slug: 'sala-de-parto', nome: 'Sala de parto', area: 'Nascimento', frase: 'O início da vida, com segurança e humanização.', resumo: 'Golden Hour, contato pele a pele, clampeamento tardio do cordão e reanimação segundo a SBP.' },
  { slug: 'puericultura', nome: 'Puericultura', area: 'Consultório', frase: 'A ciência por trás do crescimento saudável do seu filho.', resumo: 'Acompanhamento contínuo, muito além da balança e da fita métrica.' },
  { slug: 'prematuridade', nome: 'Prematuridade', area: 'Neonatologia', frase: 'Da sala de parto à puericultura dedicada.', resumo: 'No ritmo de cada bebê, buscando o potencial máximo de desenvolvimento.' },
  { slug: 'pediatria-clinica', nome: 'Pediatria clínica', area: 'Consultório', frase: 'Menos remédios, mais atenção e soluções eficazes.', resumo: 'Medicina baseada em evidências. Em casos individuais, homeopatia.' },
  { slug: 'telemedicina', nome: 'Telemedicina', area: 'Online', frase: 'Seu pediatra onde você estiver.', resumo: 'Para outras cidades e outros países, com o mesmo cuidado da consulta presencial.' },
  { slug: 'uti', nome: 'UTI neonatal e pediátrica', area: 'Alta complexidade', frase: 'Urgência e emergência.', resumo: 'Uma prática que lembra todos os dias da força de recuperação de uma criança.' },
  { slug: 'palestras', nome: 'Palestras e cursos', area: 'Ensino', frase: 'Para famílias, gestantes e profissionais.', resumo: 'Palestras, cursos e workshops. Temas a definir.' },
]

export const jornada = [
  { quando: '28 a 34 semanas', titulo: 'Pré-natal pediátrico', texto: 'Plano de parto pediátrico, Golden Hour, amamentação, enxoval inteligente e espaço para medos e expectativas.' },
  { quando: 'O nascimento', titulo: 'Sala de parto', texto: 'Contato pele a pele imediato, clampeamento oportuno do cordão e amamentação na primeira hora.' },
  { quando: '1º ano', titulo: 'Puericultura mensal', texto: 'Crescimento, desenvolvimento, sono, vacinas e alimentação, com um olhar que vai além da balança.' },
  { quando: '1 a 2 anos', titulo: 'Marcos do desenvolvimento', texto: 'Consultas menos frequentes, no ritmo de cada criança.' },
  { quando: 'Após 2 anos', titulo: 'Acompanhamento contínuo', texto: 'Ao menos uma consulta por ano, presencial ou online.' },
]

export const abordagem = {
  futuro: 'Já se foi o tempo em que o pediatra servia só para dar remédio quando a criança adoecia. Cuidar de criança é ver além da febre e da tosse: mergulhar nos sorrisos, nas birras e nas descobertas.',
  futuroItens: ['Desenvolvimento neuropsicomotor', 'Alimentação, sono e ambiente familiar', 'Saúde emocional e prevenção de acidentes'],
  menosRemedio: [
    'O organismo das crianças tem uma capacidade fenomenal de criar seus próprios mecanismos de defesa. Cada resfriado e cada febre leve é uma aula para o sistema imunológico.',
    'Minha abordagem é baseada em evidências: entender a causa dos sintomas, prevenir doenças e usar o remédio só quando é realmente necessário e seguro.',
    'Meu papel é oferecer informação, encorajar a família e dar ferramentas para reconhecer os sinais de alerta verdadeiros. O caminho é fortalecer, não apenas remediar.',
  ],
}

export const consultorio = [
  'No meu consultório não há mesa nem computador entre mim e o seu filho. Há tapete no chão, brinquedos e livros, e tudo isso tem propósito.',
  'Avalio enquanto a criança brinca, explora e se diverte. É pelo movimento e pelo brincar livre que observo o desenvolvimento neuropsicomotor, a linguagem e a interação social.',
  'No lúdico, a criança se sente à vontade, a conversa com os pais fica mais leve e o cuidado se torna uma experiência positiva.',
]

// ILUSTRATIVOS: substituir pelos depoimentos reais, com autorização por escrito.
export const depoimentos = [
  { texto: 'Saímos do pré-natal pediátrico sabendo exatamente o que esperar da primeira hora do nosso filho.', quem: 'Mãe do Davi', idade: '4 meses' },
  { texto: 'Ela senta no chão com a Laura e explica cada marco. A consulta virou um momento que a gente espera.', quem: 'Pais da Laura', idade: '2 anos' },
  { texto: 'Moramos fora e a telemedicina mantém o acompanhamento com a mesma pediatra desde o nascimento.', quem: 'Família do Theo', idade: '1 ano' },
]

export const faq = [
  { p: 'Quando agendar o pré-natal pediátrico?', r: 'No 3º trimestre, entre 28 e 34 semanas, idealmente entre 30 e 32. Pode ser presencial ou online.' },
  { p: 'A telemedicina atende emergências?', r: 'Não. Em emergências ou sintomas graves, procure atendimento presencial imediatamente. Algumas situações agudas podem ser avaliadas e direcionadas online.' },
  { p: 'Como funciona a consulta online?', r: 'Por vídeo, realizada pessoalmente pela Dra. Patrícia, em plataforma segura, com prontuário oficial e sigiloso. A duração é a mesma da consulta presencial.' },
  { p: 'A consulta online substitui o exame físico?', r: 'Em muitos casos, a consulta online resolve com êxito. Quando o exame físico for necessário, isso será dito com clareza.' },
  { p: 'E como fica o peso e a medida?', r: 'A família informa as medidas, que são avaliadas nas curvas de crescimento. A consulta pediátrica vai muito além de pesar e medir.' },
  { p: 'É possível receber receitas e pedidos de exames?', r: 'Sim. Receitas, declarações e pedidos de exames são enviados de forma digital.' },
  { p: 'A partir de que idade?', r: 'A partir de 1 mês de vida. A telemedicina pode ser intercalada com consultas presenciais.' },
  { p: 'Com que frequência levar meu filho à puericultura?', r: 'Mensalmente no 1º ano, com menor frequência entre 1 e 2 anos, e ao menos uma vez por ano depois dos 2 anos.' },
]

export const onlineFunciona = ['Pré-natal pediátrico', 'Introdução alimentar', 'Amamentação', 'Homeopatia']
