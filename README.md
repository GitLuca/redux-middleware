# Middleware

CONS: 
1. non posso prendere i valori di ingresso della action per usarlo per modificare lo state come nei thunk (se api non mi da tutte le info)
2. devo usare il mask per associare le action perchè non posso passare una funzione
3. non posso usare il then quando dispatcho un action di API perché il dispatch semplice non ritorna una promise