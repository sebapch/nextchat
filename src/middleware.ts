// Import necessary modules
import { getToken } from 'next-auth/jwt'
import {withAuth} from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// Define middleware function and export it
export default withAuth(
    async function middleware(req){

        // Get the pathname of the requested URL
        const pathname = req.nextUrl.pathname

        // Define the routes that require authentication
        const sensitiveRoutes = ['/dashboard']

        // Check if the user is authenticated
        const isAuth = await getToken({req})

        // Check if the user is trying to access the login page
        const isLoginPage = pathname.startsWith('/login')

        // Check if the user is trying to access a sensitive route
        const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>pathname.startsWith(route))

        // If the user is trying to access the login page
        if(isLoginPage){
            // Redirect them to the dashboard if they are already authenticated
            if(isAuth){
                return NextResponse.redirect(new URL('/dashboard', req.url))
            }

            // Otherwise, let them access the login page
            return NextResponse.next()
        }

        // If the user is not authenticated and is trying to access a sensitive route
        if(!isAuth && isAccessingSensitiveRoute){
            // Redirect them to the login page
            return NextResponse.redirect(new URL('/login', req.url))
        }

        // If the user is trying to access the home page, redirect them to the login page
        if(pathname === '/'){
            return NextResponse.redirect(new URL('/login', req.url))
        }

    }, {
        callbacks: {
            async authorized(){
                return true
            },
        },
    }
)

// Define the routes that this middleware should match against
export const config={
    matcher: ['/', '/login', '/dashboard/:path*']
}