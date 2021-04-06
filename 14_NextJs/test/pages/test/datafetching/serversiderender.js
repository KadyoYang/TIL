
export default function ServerSide({date}){
    return (
        <div>
            {date}
        </div>
    )
}

/*
# context는 다음을 포함
    params: If this page uses a dynamic route, params contains the route parameters. If the page name is [id].js , then params will look like { id: ... }. To learn more, take a look at the Dynamic Routing documentation.
    req: The HTTP IncomingMessage object.
    res: The HTTP response object.
    query: An object representing the query string.
    preview: preview is true if the page is in the preview mode and false otherwise. See the Preview Mode documentation.
    previewData: The preview data set by setPreviewData. See the Preview Mode documentation.
    resolvedUrl: A normalized version of the request URL that strips the _next/data prefix for client transitions and includes original query values.
    locale contains the active locale (if enabled).
    locales contains all supported locales (if enabled).
    defaultLocale contains the configured default locale (if enabled).


*/

export async function getServerSideProps(context) {
    let time = Date.now().toString();
    return {
      props: {
          date : time,
      }, // will be passed to the page component as props
    }
  }
  