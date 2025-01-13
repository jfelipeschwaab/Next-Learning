//Módulo 1 Codecademy
//1. Client-Side Rendering
/*
Pense num site que oferece uma grande interatividade e dinâmica como Youtube e
AirBnB. CSR (Client-Side Rendering) se torna um papel importante para que tais experiências
se tornem realidade

Em CSR, A response do server para o client inclui todos os arquivos necessários para renderizar
componentes no browser do client e permitir interatividade sem ter que fazer nenhum request adicional

A response contém HTML Pages, JS, entre outros.

CSR é uma solução ideal para componentes com state ou muitas interações como botões e form fields. Uma 
aplicação popular do CSR é o single-page application (SPA) pattern. Nesse pattern, o usuário permanece na página,
com o JavaScript perfeitamente atualizando ou repôndo conteúdo. Essa alternativa não recarrega a página inteiramente mas dinâmicamente
busca novos dados externos do servidor assim que necessário - Pense em como o seu Gmail Inbox atualiza com novos e-mails, sem ter que 
recarregar a página por inteiro

Em Next.js, Client-side pode ser implementado explicitamente atraves de client components, uma opção de feature que permite devs para designar
componentes específicos para ser renderizados do lado do cliente

Ex:
'use client'
import React, { useState } from 'react'

export default function Page() {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <div onClick={() => setToggle(!toggle)}>
      {toggle ? 'True': 'False'}
    </div>
  )
}

Devemos apenas utilizar a o directive 'use client'
*/

'use client'
import { useState } from 'react';

export default function ThemeSwitch() {
    const [light, setLight] = useState<boolean>(true);

    const toggleTheme = () => {
        setLight(!light);
    };

    return (
        <>
            <BackgroundManager light={light}/>
            <button onClick ={toggleTheme}>
                Switch to {light ? "Night" : "Day"} Mode
            </button>
        </>
    )
}

//2. Server-Side Rendering
/*
Enquanto o CSR permite o website ser dinâmico e interativo, construir e carregar a página toda no hardware do cliente
pode ser perigoso. Uma conexão com internet lenta ou um hardware lento pode resultar numa página em branco sendo carregada
por causa do CSR

no SSR (Server-Side Rendering), a webpage é montada no server. Transferir a renderização para o servidor aproveita a infraestrutura de servidor mais capaz, 
reduzindo a carga no hardware do cliente.

SSR É ideal para aplicações Web que necessitam de busca de dados, SEO(Search Engine Optimization) e velocidade. Por mover os request para próximos do banco de
dados, devs reduziram a latência dos requests. Mandar páginas totalmente renderizadas significa que os usuários conseguem ver imediatamente a página ao visitar
no site, sem necessidade do hardware do cliente.

As páginas renderizadas podem então ser rastreadas e indexadas por bots de mecanismos de pesquisa, levando a um melhor SEO.

Por padrão, Next.js renderiza os componentes no lado do server, você pode definir um componente React sem configurações adicionais, 
já que o Next automaticamente manuseia o SSR

Com o SSR, o Next oferece três maneiras distintas: Static Rendering, Dynamic Rendering e Streaming. 

Nesse ponto, enquanto a página é visível e contém botões e form fields, elas não são inteiramente interativas, seria como
apenas a primeira camada de tinta ao pintar uma parede
*/

import React from 'react'
const fetchCurrentTime = (): string => {
  return new Date().toLocaleString();
};

export default function TimePage () {
    const currentTime = fetchCurrentTime()

    return (
        <>
            <p>
                "The current time is: {currentTime}"
            </p>
        </>
    )
}

//3. Adding Interactivity With Hydration
/*
Vimos que por mais que nosso web-app com SSR fique visível, ele não fica interativo.

Enquanto o processo SSR é a primeira camada da nossa "pintura", a Hydration é a segunda
camada. Após o HTML server-sent é carregado no browser do client, o pacote JS que acompanha
o HTML começa a ser executado. Esse JS incluí o código react, que "hydrates"(hidrata) o HTML Estático.

Hydration envolve atribuir Event Handlers e linkar o Componente React com seus Outros HTML's. 

Durante esse processo, React também performa reconciliação, comparando o resultado de renderizar componentes
no Client-side com o resultado de renderizar no Server-side, garantindo que estão em sincronia

Uma vez que a hydration esteja completa, a webpage se torna totalmente interativa. A partir deste ponto, qualquer busca
de dados ou interação, apenas gera um re-render do componente afetado. Esse re-rendering é feito totalmente no lado do cliente, e os 
componentes são atualizados para refletir seus novos estados e props

Com Hydration, vemos que o Next.Js não é apenas confinado à um lado.
*/

//4. Setting Up a Project
//Basta utilizar o comando create-next-app app-name e selecionar suas prioridades


//5. The App Router
/*
O App Router é um novo Router disponível fora da caixa no /app directory do Projeto Next. Essa Feature do Next enfrenta um significante
problema do React: A falta de implementação de um router nativo. Isso simplifica o web Development por prover um poderoso e flexível routing system,
busca de dados eficiene, improved performance, e fácil aplicação em aplicações existentes

O App Router é um file-system based router aonde a estrutura do seu /app directory deterima as rotas e URL Paths disponíveis para sua aplicação
inteira. Vamos explorar routing mais para frente, agora, vamos explorar o /app Directory e suas rotas básicas

No App Router, cada pasta determina uma rota que existe. Para fazer essa rota acessível, um arquivo page.tsx deve existir no diretório

Por exemplo, o root /app folder pode ser tratado como a homepage e adicionando uma page.tsx o torna acessível, o UI é contido no arquivo page.tsx
*/
//Isso em um arquivo Page.tsx :
export default function Page() {
    return (
      <>
      <h1>"Hello, Next.js!"</h1>
      </>
    )
  }

//6. Styling in Next.js
/*
A estilização no Next pode ser feita de diversas maneiras. Por padrão, Next tem suporte para Global CSS, CSS Modules, Tailwind CSS, CSS-in-JS e Sass

Neste exercício, utilizaremos CSS Modules e Global CSS

CSS Modules é uma ótima maneira para prever colisões de nomes, por modularizar arquivos CSS
ex:
import styles from './HomePage.modules.css'

export default function Page() {
 return <h1 className={styles.header}>Hello, World!</h1>
}


Mas também podemos utilizar um CSS Global, geralmente criado na pasta /app
//layout.tsx
import './global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

*/
//Ex em HomePage:
import styles from'./HomePage.module.css'
import './globals.css'
export default function Page() {
  return <div className={styles.intro}>Framework Supermarket</div>;
}
