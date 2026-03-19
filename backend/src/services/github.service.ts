import axios from "axios";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    'User-Agent': 'github-profile-anaylzer'

}

interface GithubProfile {

    login: string,
    name: string,
    bio: string,
    followers: number,
    following: number,
    public_repos: number,
    avatar_url: string,
}

interface GithubRepo {
    name: string,
    description: string,
    language: string,
    stargazers_count: number,
    forks_count: number,
    fork: boolean,
    html_url: string,
}

const fetchUserData = async (username: string) => {


    const profileRes = await axios.get<GithubProfile>(
        `https://api.github.com/users/${username}`,
        { headers }
    )

    const reposRes = await axios.get<GithubRepo[]>(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=stars`
    )

    const profile = profileRes.data
    const allRepos = reposRes.data

    const ownRepos = allRepos.filter((repo) => !repo.fork)

    const languages: Record<string, number> = {}
    ownRepos.forEach((repo) => {
        if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1
        }
    })

    let totalStars = 0;
    ownRepos.forEach((repo) => {
        totalStars = totalStars + repo.stargazers_count;
    });

    const topRepos = ownRepos.slice(0, 10).map((repo)=>({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count ,
        forks: repo.forks_count,
        url: repo.html_url,
    }))


    return {
        profile:{
            username: profile.login,
            name: profile.name,
            bio: profile.bio,
            followers: profile.followers,
            following: profile.following,
            publicRepos: profile.public_repos,
            avatarUrl: profile.avatar_url,
        },
        languages,
        topRepos,
        totalStars,

    }
}

export default fetchUserData