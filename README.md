## Despliegue
> [!INFO]
> Vale señores, como sé que no es normal ejecutar un bot en Typescript os digo cómo desplegarlo.

1. Haz un fork ⚔️ de [este respositorio]("https://github.com/Jotis1/yorubot/pulls")
2. En tu repositorio local setea las variables de entorno en un archivo `.env.local` o `.env` (depende de cómo te vaya 👍)
3. Instala todas las cositas 😘
    ```bash
    yarn init -y
    yarn install
    # o depende del instalador de paquetes que tengas
    npm init -y
    npm install
    # y con pnpm lo mismo 😒
    ```
4. Tienes **un** comando bien bonico en el `package.json`, mira a ver cómo se llama y... adivinaste, ejecútalo si quieres que te rule.
    ```bash
    yarn dev:watch
    # y bueno ya sabemos, con el resto lo mismo
    npm run dev:watch
    ```
5. El último paso como decía **Arguiñano**: 
    > A disfrutar 😎