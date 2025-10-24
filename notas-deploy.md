# Notas sobre Deploy

## 1. O que é deploy de um site?
O deploy é o processo de publicar um site ou aplicação na internet, tornando-o acessível aos usuários. Envolve:
- Transferir arquivos para um servidor
- Configurar ambiente de produção
- Garantir que tudo funcione em um ambiente público
- Estabelecer domínio e SSL se necessário

## 2. O que a Vercel faz diferente de abrir index.html no navegador?
A Vercel oferece:
- Servidor web profissional
- CDN global para melhor performance
- HTTPS automático
- Domínio personalizado
- Preview de branches
- Integração contínua
- Logs e monitoramento
Diferente de abrir localmente, onde só você tem acesso.

## 3. Qual a diferença entre branch 'main' e 'desenvolvimento' no contexto de deploy?
- main: Branch de produção, contém código estável e testado
  - Geralmente conectada ao ambiente de produção
  - Mudanças aqui afetam usuários reais
  - Requer mais cuidado e testes

- desenvolvimento: Branch para trabalho em andamento
  - Ambiente de staging/teste
  - Pode conter código não finalizado
  - Ideal para testes e validação
  - Preview deployments para feedback

## 4. O que são "environment variables" (variáveis de ambiente)?
São configurações externas ao código que:
- Armazenam dados sensíveis (APIs, senhas)
- Mudam entre ambientes (dev/prod)
- Permitem configuração sem alterar código
- Mantêm segurança de informações críticas
- Facilitam manutenção e escalabilidade

Exemplos:
- API_KEY
- DATABASE_URL
- NODE_ENV
- STRIPE_SECRET