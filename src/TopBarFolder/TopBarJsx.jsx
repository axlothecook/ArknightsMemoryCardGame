import Settings from "../SettingsFolder/SettingsJsx";
import GithubIcon from "./iconComponents/components/GithubIcon";

const Links = () => {
    return (
        <ul className="size-full flex items-center justify-between">
            <li className="flex flex-1 max-w-[50px] md:max-w-[130px]">
                <Settings />
            </li>
            <li>
                <h1 className="text-sm sm:text-2xl md:text-3xl font-semibold">Arknights Memory Card Game</h1>
            </li>
            <li>
                <a href='https://github.com/axlothecook/ArknightsMemoryCardGame.git' target="_blank">
                    <GithubIcon />
                </a>
            </li>
        </ul>
    )
}

const TopBar = () => {
    return (
        <header className="backdrop-blur-3xl flex pt-2 pb-2 pr-4 pl-4 max-sm:p-2">
            <nav className="size-full flex">
                <Links />
            </nav>
        </header>
    )
};

export default TopBar;