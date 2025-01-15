/*
Módulo 2 Codecademy
*/

//1. Basic Routes
/*
pagetsx é um dos vários arquivos reservados em Next.js. Lembre-se que criar uma pasta não cria automaticamente
uma rota que users podem visitar. Devemos adicionar um arquivo page.tsx na pasta e default export um componente
para o APP Router entender que essa pasta é acessível

Além de page.tsx, Next.js utiliza layout.tsx para padronizar o UI, ou seja, manter um layout consistente em todas
as páginas, como sidebar, menus, rodapés

Pode fornecer contextos compartilhados como ThemeProvider ou AuthProvider, garantindo que todas as páginas compartilhem estados
globais

Pode incluir componentes <head> para definir metadados básicos, como título e descrição

Falamos muito de segmentos aninhados, mas como criamos um? para criar, criamos um novo segmento(folder) dentro de um outro segmento(folder)

Ex:
├── app
│   ├── settings
│   │   ├── page.tsx
│   │   ├── billing
│   │   │   ├── page.tsx 
│   ├── info
│   │   ├── MyComponent.tsx
│   ├── layout.tsx

*/

import type { Metadata } from 'next'
import { ReactNode } from 'react'
import '../globals.css'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
export const metadata: Metadata = {
  title: 'Article Reader',
  description: 'Application to read codecademy articles',
}

export default function RootLayout({children}) {
  return(
    <html>
      <body>
      </body>
    </html>
  )
}


//2. Dynamic Routes
/*
Anteriormente, vimos como criar rotas aninhadas para definir UI's únicos baseado na URL Path. Mas e se nosso path estiver mostrando
conteúdo relativo para um user específico? Por exemplo, se nossa aplicação mostra informações relevantes ao usuário baseado no
UserID, devemos definir segmentos de Path para cada ID Possível? como /users/10 ou /users/20

A resposta é, claro que não. Para lidar com situações desse tipo, podemos utilizar segmentos dinâmicos. Segmentos dinâmicos são
porções dinâmicas da URL que podem mudar, tipo a demonstrada /users/10 ou /users/20

Para definir um segmento dinâmico em Next.js devemos utilizar a seguinte sintaxe:

├── app
│   ├── users
│   │   ├── [userId]
│   │   │   ├── page.tsx 


Podemos acessar os dados do segmento dinâmico por referenciar o nome da pasta como um parâmetro prop no componente page.tsx
Ex:
// destructure params which contain our identifier as a property
export default function MyUserPage( { params } : { params: { userId: string }}) {
  return (
    <h1>Greetings user: {params.userId}</h1>
  )
}


Quando trabalhamos com segmentos dinâmicos, podemos querer guardar algumas análises sobre a quantidade de usuários que navegaram
até tal página. Isso parece um bom lugar para usar nosso shared UI em um arquivo layout.tsx, mas, como layouts não re-renderizam
em segmentos de navegação aninhados, não poderiamos rerun our API Call

Para consertar esse problema, podemos utilizar o template.tsx, um arquivo reservado.
template.tsx é similar ao layout.tsx no que:
- template.tsx também define um sharable UI para seus segmentos aninhados
- Deve ser um default export component
- o Default exported component recebe uma children prop

Mas difere-se em que ele é re-instansiated em nested segment navigation. Podemos tirar vantagem dessa feature para contar
a quantidade de users que visitaram:

Ex:
// import statements

// re-instantiated on nested segment navigation
export default function MyTemplate({children}: {children : ReactNode}) {
  useEffect(() => {
    updateUsersCounter()  // API call
  }, [])  // runs on mount
  // other logic for MyTemplate
}


*/
'use client'

import { CATEGORIES, ARTICLES } from '../../../store/data'


export default function CategoryPage({params} : {params: {name : String} }) {
const categoryName = params.name
return (
  <section>
    <h2>Articles related to {categoryName}</h2>
    <ul>
      {CATEGORIES[categoryName]?.map(articleSlug => (
        <li key={articleSlug}>
          <Link href={`/articles/${articleSlug}`}>{ARTICLES[articleSlug].title}</Link>
        </li>
      ))}
    </ul>
  </section>
)

}

//3. Using the <Link> Component
/*
Next.js provê algumas maneiras de nos dar uma navegação SPA(Single Page Application), Lembre-se que SPA refere-se a ideia de mudar o caminho
do browser sem ter que fazer uma nova request para o servidor. Nesse exercício, exploraremos o <Link> Component

Um <Link> Component pode ser utilizado da seguinte maneira:
const selectedUser = "25"  // user selected user id
<section>
  <Link href="/users">Users</Link>
  <Link href=`/users/${selectedUser}`>User: {selectedUser}</Link>   //Dynamic Path
  <Link href="/settings" replace>My Settings</Link> //replaces current path in browser history
  <Link href="/info">Info</Link>
</section>

- href prop determina o caminho que queremos navegar 
- href prop pode ser utilizada para um segmento dinâmico (No exemplo acima, é utilizado um template literal)
- O conteúdo de texto é o texto displayed na UI
- replace prop é utilizado para atualizar o atual URL Path para o caminho que o href indica

o <Link> Component é uma extensão do <a> que adiciona uma funcionalidade prefetching. Com prefetching, Next.js irá 
prefetch route segments automaticamente para que quando um usuário navegar para esses segmentos, o browser não necessita
dar reload

<Link> components podem ser utilizados em conjunto com o usePathName() hook do package next/navigation para aplicar
alguns "active" styles para o <Link>

usePathName() retorna o atual URL Path como uma string e pode ser utilizado para aplicar estilos ao elemento <Link>:
'use client'
import Link from 'next/link'
import { usePathname } from "next/navigation";

const pathname = usePathname()  // current path: /users
<section>
  <Link href="/users" className={pathname === "/users" ? styles.active : ""}>Users</Link> /* currently active
  <Link href="/info" className={pathname === "/info" ? styles.active : ""}>Info</Link> /* not active 
</section>


Note que o usePathName() pode ser utilizado apenas com client components, então temos que utilizar o 'use client' directive


*/
'use client'
import Link from 'next/link'
import styles from './Navigation.module.css'
import { usePathname } from 'next/navigation'

export default function Navigation() {
    const pathname = usePathname()
    return (
    <nav className={styles.nav}>
        <Link href="/about" className={pathname === "/about" ? styles.active : ""}>About</Link>
        <Link href="/articles" className={pathname === "/articles" ? styles.active : ""}>Articles</Link>
        <Link href="/categories" className={pathname === "/categories" ? styles.active : ""}>Categories</Link>
    </nav>
  )
}


import { AUTHORS } from "../../../store/data"

export default function AuthorsPage({ params }: { params: { name: string } }) {
  const author = AUTHORS[params.name]

  return (
    <section>
      <h1>Articles by {params.name}</h1>
      <ul>
        {author && author.articles.map((slug) => (
          <li key={slug}>
            <Link href={`/articles/${slug}`}>{slug}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

//The useRouter() Hook
