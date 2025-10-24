# Notas sobre CI/CD

## 1. O que significa CI/CD?
CI/CD significa Integração Contínua (CI) e Entrega/Deploy Contínuo (CD):

**Integração Contínua (CI):**
- Integração frequente de código ao repositório principal
- Testes automatizados a cada integração
- Detecção rápida de problemas
- Garantia de qualidade contínua

**Entrega/Deploy Contínuo (CD):**
- Automatização do processo de deploy
- Entrega rápida e confiável
- Redução de erros humanos
- Feedback mais rápido

## 2. Como a Vercel detecta que fiz um push no GitHub?
A Vercel usa webhooks do GitHub:
1. Webhook configurado no repositório
2. GitHub notifica Vercel sobre mudanças
3. Vercel inicia processo de build
4. Deploy automático se build suceder

## 3. Qual o fluxo completo desde `git push` até o site atualizado?
1. Developer faz push para GitHub
2. GitHub envia webhook para Vercel
3. Vercel inicia novo build:
   - Clona repositório
   - Instala dependências
   - Executa scripts de build
   - Executa testes
4. Se build sucede:
   - Deploy para CDN
   - Invalidação de cache
   - Atualização de DNS
5. Site atualizado disponível

## 4. O que aconteceria se eu fizesse push na branch 'main' em vez de 'desenvolvimento'?
- Mudanças iriam direto para produção
- Usuários veriam alterações sem teste
- Maior risco de problemas
- Possível impacto em métricas de negócio
- Difícil reverter em caso de problemas

## 5. Quais as vantagens do deploy automático vs manual?
**Deploy Automático:**
- Menos erro humano
- Processo consistente
- Mais rápido e eficiente
- Rastreabilidade completa
- Facilita rollback
- Melhor para equipes

**Deploy Manual:**
- Mais controle
- Maior risco de erro
- Processo mais lento
- Difícil padronizar
- Dependente de pessoas