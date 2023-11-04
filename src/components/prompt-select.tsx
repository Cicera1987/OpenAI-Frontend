import { api } from "@/lib/axios";
import React, { SetStateAction, useEffect, useState } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface Prompt{
    id: string
    title: string
    template: string
}

interface PromptSelectProps{
    onPromptSelect: (template: string) => void
}

export function PromptSelect(props: PromptSelectProps) {
    const [prompts, setPrompts] = useState<Prompt[] | null>(null)

    useEffect(() => {

        api.get('/prompts').then((response) => {
            setPrompts(response.data)

        })

    }, [])

    function handlePromptSelectd(promptId: string){
      const selectedPrompt = prompts?.find((prompt) => prompt.id ===  promptId)

      if(!selectedPrompt){
        return
      }

        props.onPromptSelect(selectedPrompt.template)
    }

    return (
        <Select onValueChange={handlePromptSelectd}>
            <SelectTrigger>
                <SelectValue placeholder="Selecione um prompt..." />
            </SelectTrigger>
            <SelectContent>
                {prompts?.map((prompt) => {
                    return(
                        <SelectItem key={prompt.id} value={prompt.id} >
                            {prompt.title}
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}