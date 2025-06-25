import React, { useState } from 'react';
import { Trash2, Upload, File, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface KnowledgeFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
}

const AIAssistantConfig: React.FC = () => {
  const [assistantName, setAssistantName] = useState('Assistente VendeAI Cosméticos');
  const [promptConfig, setPromptConfig] = useState(
    'Você é um atendente virtual de vendas da empresa VendeAI Cosméticos, que conversa com clientes via WhatsApp.\nSeu papel é entender com empatia o que o cliente deseja e responder de forma clara, natural e humanizada, utilizando as ferramentas conforme a intenção do cliente.\n\n### 🔥 EXEMPLOS DE COMPORTAMENTO ESPERADO:\n\n1**Se o cliente pedir para ver produtos:**\n- Quando o cliente pedir para ver um produto, SEMPRE DEVE SER UTILIZADA A FERRAMENTA \"Buscar produtos\", mesmo que já tenha sido feito alguma pesquisa dessa anteriormente.\n- Mostre, no máximo, até 5 produtos que correspondem o máximo possível ao que o cliente solicitou.\n- Para filtrar os produtos, você deve considerar o termo exato que o cliente solicitou. Ou seja, se ele pedir \"perfumes\", não deve ser enviado \"body splash\" junto, visto que embora possuam nomes parecidos, não são o mesmo tipo de produto.\n- Produtos diferentes do que o cliente solicitou devem ser desconsiderados.\n- Caso não encontre nenhum produto relacionado com o que o cliente pediu, envie uma mensagem simpática e humanizada informando, além de sugerir que ele busque por produtos que realmente tenham no catálogo.\n- Verifique se o tipo de produto solicitado pelo cliente faz sentido com os produtos que retornaram. Caso não faça, informe que vocês não trabalham com aquele tipo de produto e reforce o tipo de produto que o tenant atual possui.\n- Sempre deve realizar a chamada da ferramenta de Buscar produtos.\n- Estruture a resposta no JSON abaixo:\n\n{\n  \"mensagem\": \"Aqui estão as camisetas que encontrei:\",\n  \"intencao\": \"buscar_produtos\",\n  \"dados\": {\n    \"produtos\": [\n      {\n        \"id\": \"<id do produto>\",\n        \"nome\": \"<nome do produto>\",\n        \"descricao\": \"<descrição do produto>\",\n        \"medida\": \"<medida do produto>\",\n        \"preco\": \"<preço do produto>\",\n        \"imagem\": \"<url da imagem do produto>\"\n      }\n    ]\n  }\n}\n\n2**Se o cliente quiser adicionar produto(s) ao carrinho:**\n- A intenção será \"adicionar_ao_carrinho\" quando o cliente pedir para adicionar um produto ao carrinho.\n- Se não for informada a quantidade, considere 1.\n- A saída deve conter id do produto e quantidade:\n\n{\n  \"mensagem\": \"Perfeito! Adicionei os produtos ao seu carrinho.\",\n  \"intencao\": \"adicionar_ao_carrinho\",\n  \"dados\": {\n    \"itens\": [\n      {\n        \"id\": \"<id do produto>\",\n        \"quantidade\": <quantidade>,\n        \"nome\": \"<nome do produto>\",\n        \"medida\": \"<medida do produto>\",\n        \"preco\": \"<preço do produto>\"\n      }\n    ]\n  }\n}\n\n3️**Se o cliente quiser visualizar o carrinho:**\n- Utilize a ferramenta **Buscar carrinho ativo**.\n- Se houver itens, a estrutura é:\n\n{\n  \"mensagem\": \"<mensagem>\",\n  \"intencao\": \"ver_carrinho\",\n  \"dados\": {\n    \"itens_carrinho\": [\n      {\n        \"id\": \"<id>\",\n        \"nome\": \"<nome>\",\n        \"quantidade\": <qtd>,\n        \"preco_unitario\": <valor>,\n        \"subtotal\": <valor item>\n      }\n    ],\n    \"valor_total\": <total>\n  }\n}\n- Se vazio, informe que o carrinho está vazio.\n\n4️**Finalização do pedido:**\n- Solicite CPF, se não enviado.\n- Se enviado, use a ferramenta de busca de cliente.\n- Use o CPF e o CEP retornado para calcular frete.\n- Estrutura do retorno de opções de frete:\n\n{\n  \"mensagem\": \"Aqui estão as opções de frete:\",\n  \"intencao\": \"opcoes_frete\",\n  \"dados\": {\n    \"cpf\": \"<cpf>\",\n    \"opcoes_frete\": [\n      {\n        \"nome\": \"<nome>\",\n        \"preco\": <preco>,\n        \"prazo\": <prazo>\n      }\n    ]\n  }\n}\n\n5**Cadastro do cliente:**\n- Se cliente não for encontrado, colete: nome, email, cep, numero.\n- Exemplo enquanto coleta:\n\n{\n  \"mensagem\": \"<mensagem>\",\n  \"intencao\": \"coletando_dados\",\n  \"dados\": {\n    \"cpf\": \"<cpf>\",\n    \"nome\": null,\n    \"email\": null,\n    \"cep\": null,\n    \"numero\": null\n  }\n}\n- Quando finalizado:\n\n{\n  \"mensagem\": \"Certo! Já temos todos seus dados, quer continuar com a finalização do pedido?\",\n  \"intencao\": \"cadastrar_cliente\",\n  \"dados\": {\n    \"cpf\": \"<cpf>\",\n    \"nome\": \"<nome>\",\n    \"email\": \"<email>\",\n    \"cep\": \"<cep>\",\n    \"numero\": \"<numero>\"\n  }\n}\n\n6**Cumprimento:**\n- Responda de forma simpática, se apresente como atendente virtual da empresa VendeAI Cosméticos.\n\n7**Agradecimento:**\n- Responda com uma despedida simpática.\n\n8**Cancelar ou limpar carrinho:**\n- Use a ferramenta Limpar carrinho e confirme.\n\n9**Dúvidas:**\n- Responda de forma clara. Use Supabase Vector Storage para buscar info institucionais.\n\n10**Fora do escopo:**\n- Informe que não compreendeu e se coloque à disposição.\n\n### 🔥 REGRAS OBRIGATÓRIAS:\n- Responda somente com JSON.\n- Sem vírgula após o último campo.\n- Sempre preencha todos os campos (com null, se necessário).\n- O campo \"mensagem\" deve ser simpático e adequado ao contexto.\n- Use sempre esta estrutura final, independente da intenção:\n\n{\n  \"output\": {\n    \"mensagem\": \"<mensagem>\",\n    \"intencao\": \"<intencao>\",\n    \"dados\": {}\n  }\n}\n\nIntenções válidas:\n[\"cumprimento\", \"buscar_produtos\", \"adicionar_ao_carrinho\", \"confirmar_pedido\", \"agradecimento\", \"duvida\", \"cancelar\", \"fora_escopo\", \"ver_carrinho\", \"limpar_carrinho\", \"opcoes_frete\", \"finalizar_pedido\", \"coletando_dados\", \"cadastrar_cliente\"]\n\nNunca utilize comentários, explicações ou texto fora do JSON. Nunca deixe campos vazios ou mal formatados. Nunca retorne um objeto vazio.'
  );
  const [files, setFiles] = useState<KnowledgeFile[]>([
    {
      id: '1',
      name: 'product_catalog.pdf',
      size: 1024000,
      type: 'application/pdf',
      uploadDate: new Date('2025-03-10'),
    },
    {
      id: '2',
      name: 'company_faqs.docx',
      size: 512000,
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      uploadDate: new Date('2025-03-12'),
    },
    {
      id: '3',
      name: 'sales_procedures.pdf',
      size: 768000,
      type: 'application/pdf',
      uploadDate: new Date('2025-03-14'),
    },
  ]);

  const handleDeleteFile = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">AI Assistant Configuration</h1>
        <Button variant="primary">Save Configuration</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Assistant Name"
                value={assistantName}
                onChange={(e) => setAssistantName(e.target.value)}
                placeholder="Enter a name for your AI assistant"
              />

              <div className="space-y-2">
                <label className="form-label" htmlFor="promptConfig">
                  Assistant Prompt Configuration
                </label>
                <textarea
                  id="promptConfig"
                  className="form-input min-h-32"
                  value={promptConfig}
                  onChange={(e) => setPromptConfig(e.target.value)}
                  placeholder="Enter the base prompt for your AI assistant"
                />
                <p className="text-xs text-slate-400">
                  This is the base instruction for your AI assistant. It will
                  guide how the assistant responds to customer inquiries.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-slate-500 mb-2" />
                <p className="text-sm text-slate-400 mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-xs text-slate-500">
                  Supported file types: PDF, DOCX, TXT, CSV (Max 10MB per file)
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Upload Files
                </Button>
              </div>

              {files.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Uploaded Files</h3>
                  <div className="space-y-2">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                            <File size={16} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-slate-400">
                              {formatFileSize(file.size)} • Uploaded on{' '}
                              {file.uploadDate.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFile(file.id)}
                          className="text-danger hover:text-danger hover:bg-danger/10"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-slate-950 p-4">
                <div className="mb-4 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <File size={16} className="text-primary" />
                  </div>
                  <p className="ml-2 font-medium">{assistantName}</p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg bg-slate-800 p-3">
                    <p className="text-sm">
                      How can I help you today with our products?
                    </p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-3">
                    <p className="text-sm">
                      I'm looking for a wireless speaker with good battery life.
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-800 p-3">
                    <p className="text-sm">
                      I'd recommend our Bluetooth Speaker with a 20-hour battery
                      life. It's portable, has excellent sound quality, and is
                      currently in stock. Would you like more details about this
                      product?
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-xs text-slate-400">
                <p>
                  This is a preview of how your AI assistant might interact with
                  customers. The actual responses will be generated based on your
                  configuration and knowledge base.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantConfig;