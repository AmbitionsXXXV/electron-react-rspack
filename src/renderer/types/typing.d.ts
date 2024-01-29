declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}

interface Window {
  versions: {
    node: () => string
    chrome: () => string
    electron: () => string
  }
  electronAPI: {
    getStoreValue: (
      key: string,
      defaultValue?: unknown
    ) => Promise<string | InitialValueType | Record<string, any> | boolean>
    deleteStoreValue: (key: string) => Promise<void>
    setStoreValue: (key: string, value: any) => void
  }
}
