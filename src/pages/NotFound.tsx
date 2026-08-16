import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="dark flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      {/*
        A SPA responde 200 para qualquer rota, então uma URL inexistente seria
        indexada como página válida. O React 19 iça esta meta para o <head>,
        marcando a página como noindex enquanto o 404 está montado.
      */}
      <meta name="robots" content="noindex" />
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-2 text-xl">Esta página não existe.</p>
        <p className="mb-6 break-all text-sm text-muted-foreground">
          {location.pathname}
        </p>
        <a
          href="/"
          className="text-primary underline underline-offset-4 hover:text-primary-light"
        >
          Voltar ao início
        </a>
      </div>
    </div>
  );
};

export default NotFound;
