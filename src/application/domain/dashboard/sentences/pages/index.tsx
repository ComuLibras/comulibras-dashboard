import { CreateSentenceButton } from "./components/create-sentence-button";
import { SentencesContent } from "./content";
import { Table } from "@/application/shared/components/table";

export function SentencesPage() {
  return (
    <Table.Wrapper 
      title="Frases" 
      subtitle="Gerencie todas as frases disponíveis"
      renderAddButton={() => <CreateSentenceButton />}
    >
      <SentencesContent />
    </Table.Wrapper>
  )
}