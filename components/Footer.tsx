import { Button } from '@/components/ui/button'

interface FooterProps {
  onPopupOpen: () => void
}

export default function Footer({ onPopupOpen }: FooterProps) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 p-4 flex justify-center">
      <Button onClick={onPopupOpen} variant="outline">
        Surprise!
      </Button>
    </footer>
  )
}

