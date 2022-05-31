import { useEffect, useState} from "react"

export default function useFetch(){
    let [loading, setLoading] = useState<boolean>(true);
    const [translation, setTranslation] = useState<any[]>([]);
    useEffect(()=> {
        const url = "https://academtest.ilink.dev/graphql";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                query: `
                    {
                        sentenceAll {
                            en
                            ru
                        }      
                    }
                `
            })
        })
        .then(res => {
            return res.json();
        })
        .then( data => {
            setTranslation(data.data.sentenceAll);
            setLoading(false);
        })
    }, [loading])
    return {
        translation,
        loading
    }
}