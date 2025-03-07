/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import { motion  } from 'framer-motion'
import { Element } from 'react-scroll'
import { FaGithub } from 'react-icons/fa'

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
  homepage: string | null
}

interface GitHubStats {
  public_repos: number
  followers: number
  following: number
}

const GitHubSection = () => {
  const [repos, setRepos] = useState<Repository[]>([])
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [_loading, setLoading] = useState(true)
  const [_selectedRepo] = useState<Repository | null>(null)
  const username = 'ganesh-basavoju'

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`)
        const userData = await userResponse.json()
        setStats({
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following
        })

        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
        )
        const reposData = await reposResponse.json()
        setRepos(reposData)
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])

  

  

  return (
    <Element name="github" className="py-32 relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Background Animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-orange-500/5 to-yellow-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-orange-400/5 to-pink-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            GitHub Activity
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore my open source journey and contributions
          </p>
        </motion.div>

        {/* GitHub Stats with Hover Effects */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto"
          >
            {Object.entries(stats).map(([key, value]) => (
              <motion.div
                key={key}
                className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.12)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.p 
                  className="text-2xl font-bold text-gray-900"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                >
                  {value}
                </motion.p>
                <p className="text-gray-600 capitalize">{key.replace('_', ' ')}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Language Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          
          
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="text-xl" />
            View GitHub Profile
          </motion.a>
        </motion.div>
        
      </div>

      {/* Subtle glass effect overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[100px] pointer-events-none" />
    </Element>
  )
}

export default GitHubSection 