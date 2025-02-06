xt = open("voluntarios.csv", "r", encoding="UTF-8")

linha = "-"
contador = 0
while linha != "" :
    contador += 1
    linha = xt.readline()
    print(f"{contador},{linha}")