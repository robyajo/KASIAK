
import { HeaderHome } from "./_components/header-home"
import { FooterHome } from "./_components/footer-home"

export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="min-h-screen flex flex-col">
          <HeaderHome />
          <main className="flex-1">{children}</main>
          <FooterHome />
        </div>
    )
  }