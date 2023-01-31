export type TVideoDB = {
    id: string,
    title: string,
    duration: number,
    created_at: string
}

// tipagem para criação (POST) sem created_at
export type TVideoDBPost = {
    id: string,
    title: string,
    duration: number
}