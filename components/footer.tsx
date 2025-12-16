export default function Footer() {
    const today = new Date().toLocaleDateString("pl-PL");

    return (
        <footer className="mt-10 p-5 bg-[#b197fc] text-white text-center flex justify-center">
            <p className="mx-5 my-5 leading-[1.6]">Anna Kocur</p>
            <p className="mx-5 my-5 leading-[1.6]">Data: {today}</p>
            <p className="mx-5 my-5 leading-[1.6]">
                <a
                    href="https://www.pk.edu.pl"
                    target="_blank"
                    className="text-[#5a4fcf] hover:text-[#9b5cff] underline"
                >
                    Strona Politechniki Krakowskiej
                </a>
            </p>
        </footer>



    );
}
