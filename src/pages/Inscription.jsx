export default function Inscription() {
    return (
        <div>
            <h2>Connexion à l'administration</h2>
            <form>
                <input type="text" placeholder="Identifiant" />
                <input type="password" placeholder="Mot de passe" />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}