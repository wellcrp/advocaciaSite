const posts = [
    {
        id: 1,
        title: "Responsabilidade Civil: Quando há dever de indenizar",
        desc: "Entenda os elementos que configuram responsabilidade civil e como funciona a reparação de danos.",
        content: [
            "A responsabilidade civil surge quando uma conduta causa dano a outra pessoa e existe nexo entre o comportamento e o prejuízo sofrido. Na prática, isso pode ocorrer em relações contratuais, acidentes, falhas na prestação de serviços e diversas outras situações cotidianas.",
            "Para que haja dever de indenizar, normalmente se avaliam quatro elementos: conduta, dano, nexo causal e culpa, salvo hipóteses específicas de responsabilidade objetiva. Cada caso exige análise técnica dos fatos e das provas para definir a extensão da reparação cabível.",
            "Os danos podem ser materiais, quando atingem o patrimônio, e morais, quando afetam direitos da personalidade, como honra, imagem e dignidade. A quantificação não é automática e depende de critérios jurídicos, razoabilidade e entendimento dos tribunais.",
            "A atuação preventiva, com contratos claros e registro adequado de ocorrências, reduz o risco de litígios e fortalece a posição das partes em eventual disputa. Em conflitos já instaurados, a estratégia jurídica deve buscar equilíbrio entre composição eficiente e proteção integral do direito lesado."
        ],
        img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 2,
        title: "Validade de Contratos: Cláusulas essenciais",
        desc: "Conheça os requisitos jurídicos para contratos válidos e os principais pontos de atenção.",
        content: [
            "Um contrato válido deve refletir a vontade das partes, ter objeto lícito e observar os requisitos exigidos para aquele tipo de negócio. A clareza do documento é essencial para que direitos, obrigações e consequências do descumprimento sejam compreendidos desde o início.",
            "Além da identificação das partes, o contrato deve tratar de preço, prazos, forma de pagamento, responsabilidades e hipóteses de encerramento. Cláusulas genéricas ou contraditórias podem gerar interpretações diferentes e dificultar a execução do acordo.",
            "Também é importante verificar a capacidade de quem assina e a necessidade de testemunhas, reconhecimento de firma, instrumento público ou registro. A formalidade adequada fortalece a prova do negócio e pode facilitar a cobrança de uma obrigação.",
            "A revisão jurídica antes da assinatura permite corrigir riscos e adaptar o documento à realidade da operação. Um contrato bem estruturado reduz conflitos e oferece maior previsibilidade para todas as partes."
        ],
        img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3,
        title: "Inadimplemento Contratual: Direitos e Medidas",
        desc: "Veja quais medidas podem ser adotadas em casos de descumprimento contratual.",
        content: [
            "O inadimplemento contratual ocorre quando uma das partes deixa de cumprir uma obrigação no prazo, na forma ou nas condições ajustadas. A primeira providência é verificar o contrato e reunir documentos que comprovem o que foi combinado e o que efetivamente aconteceu.",
            "Dependendo do caso, a parte prejudicada pode exigir o cumprimento da obrigação, pedir a resolução do contrato ou buscar indenização por perdas e danos. A escolha da medida deve considerar o interesse econômico e a possibilidade de cumprimento tardio.",
            "Uma notificação extrajudicial pode formalizar a cobrança, estabelecer prazo para solução e demonstrar a tentativa de resolver o problema. Ela deve apresentar os fatos de forma objetiva e indicar as consequências previstas no contrato ou na lei.",
            "Quando a negociação não resolve o conflito, a documentação reunida orienta a adoção da medida judicial adequada. A atuação rápida é importante porque prazos, provas e condições do negócio podem influenciar diretamente o resultado."
        ],
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 4,
        title: "Negociação e Acordo Extrajudicial em Conflitos Civis",
        desc: "Saiba quando a solução consensual pode reduzir custos e acelerar a resolução do conflito.",
        content: [
            "A negociação extrajudicial permite que as partes construam uma solução sem iniciar imediatamente um processo. O diálogo pode tratar de prazos, valores, formas de pagamento, entrega de documentos e outras condições relevantes para encerrar a controvérsia.",
            "Para que o acordo seja seguro, é necessário delimitar o conflito, conferir os documentos e avaliar os riscos de cada alternativa. A pressa para encerrar o problema não deve levar à renúncia de direitos sem compreensão das consequências.",
            "O instrumento deve registrar obrigações objetivas, vencimentos, multas, garantias e efeitos do descumprimento. Dependendo do conteúdo, a assinatura com formalidades adequadas pode fortalecer a exigibilidade do acordo.",
            "Uma composição bem estruturada reduz custos, preserva relacionamentos e oferece previsibilidade. Mesmo quando existe disposição para conversar, a revisão jurídica é importante para transformar o entendimento em uma solução efetiva."
        ],
        img: "https://images.unsplash.com/photo-1528747045269-390fe33c19d3?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 5,
        title: "Defesa do Consumidor: Práticas Abusivas e Reparação",
        desc: "Identifique condutas abusivas e conheça os caminhos para proteger seus direitos.",
        content: [
            "As relações de consumo devem observar transparência, boa-fé e equilíbrio entre fornecedor e consumidor. Informações incompletas, cobranças sem fundamento e restrições desproporcionais podem indicar violação desses deveres.",
            "Antes de buscar uma solução, é importante guardar contratos, ofertas, comprovantes, protocolos e mensagens. Esses registros ajudam a demonstrar a contratação, o problema apresentado e as tentativas de atendimento realizadas.",
            "A solução pode começar pelos canais de atendimento do fornecedor ou por plataformas administrativas. Quando a resposta é insuficiente, a análise do caso pode indicar pedido de correção, restituição de valores ou indenização.",
            "Cada situação deve ser avaliada de acordo com a extensão do prejuízo e com as provas disponíveis. A orientação adequada evita medidas desnecessárias e aumenta a clareza sobre os caminhos para proteger o consumidor."
        ],
        img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 6,
        title: "Danos Morais e Materiais: Diferenças Práticas",
        desc: "Aprenda a diferença entre danos morais e materiais e como cada um é tratado no processo.",
        content: [
            "Danos materiais são aqueles que atingem diretamente o patrimônio e podem envolver prejuízo efetivo ou valores que razoavelmente deixaram de ser recebidos. A demonstração do dano normalmente depende de documentos, orçamentos, notas fiscais e outros registros.",
            "Danos morais estão relacionados à violação de direitos da personalidade, como honra, imagem, privacidade e dignidade. Não se confundem com qualquer aborrecimento, pois exigem situação capaz de causar lesão relevante ao aspecto pessoal da vítima.",
            "Em um mesmo fato, podem existir danos materiais e morais, mas cada pedido precisa ser fundamentado de acordo com sua natureza. A descrição precisa dos acontecimentos ajuda a delimitar a extensão da responsabilidade.",
            "A análise jurídica considera as circunstâncias do caso, a prova produzida e os critérios utilizados pelos tribunais. Uma avaliação cuidadosa evita expectativas incompatíveis e direciona a busca por reparação adequada."
        ],
        img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 7,
        title: "Prescrição no Direito Civil: Prazos Importantes",
        desc: "Confira prazos prescricionais relevantes para evitar a perda do direito de ação.",
        content: [
            "A prescrição está relacionada ao prazo para exigir judicialmente uma pretensão. O tempo aplicável varia conforme a natureza do direito, a origem da obrigação e as circunstâncias específicas do caso.",
            "Para fazer uma contagem segura, é necessário identificar quando a lesão ocorreu ou quando a obrigação se tornou exigível. Documentos, notificações e comunicações podem ajudar a definir o marco inicial.",
            "Existem situações que podem suspender ou interromper a contagem, mas esses efeitos dependem dos requisitos previstos na legislação. Por isso, não é recomendável presumir que uma negociação informal sempre interrompa o prazo.",
            "A análise preventiva evita que uma demanda seja apresentada fora do prazo ou que uma oportunidade de acordo seja perdida. Ao identificar um possível conflito, reunir documentos e buscar orientação rapidamente é a conduta mais prudente."
        ],
        img: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=800&q=80",
    },
];
