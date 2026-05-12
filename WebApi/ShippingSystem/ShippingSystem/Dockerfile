
FROM mcr.microsoft.com/dotnet/sdk:8.0 as build

RUN mkdir -p /app
WORKDIR /app


COPY *.csproj .
RUN dotnet restore


COPY . .

RUN dotnet publish -c Release -o ./output


FROM mcr.microsoft.com/dotnet/sdk:8.0 as runtime
WORKDIR /dest

COPY --from=build /app/output .

ENTRYPOINT ["dotnet","ShippingSystem.dll"]





