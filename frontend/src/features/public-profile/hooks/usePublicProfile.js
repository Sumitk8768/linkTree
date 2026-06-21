import { useCallback } from "react";
import { getLinks, linkClick } from "../services/publicProfile.api";


export const usePublicProfile = () =>{

    const fetchLinks = useCallback(async ({ username }) =>{
        try {
            const links = await getLinks({username})
            return links
        } catch (error) {
            console.error(error)
            throw error
        }
    }, [])

    const handleLinkClick = async ({ linkId }) =>{
        try {
            const response = await linkClick({ linkId })
            return response
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    return{
        fetchLinks,
        handleLinkClick,
    }
}

export default usePublicProfile;
