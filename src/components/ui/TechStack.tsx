import Card from './Card'

type TechStackProps = {
  name: string
  icon: string
}

function TechStack({ name, icon }: TechStackProps) {
  return (
    <Card
      variant="default"
      padding="sm"
      className="w-fit"
    >
      <div className="flex size-12 items-center justify-center">
        <img
          src={icon}
          alt={name}
          title={name}
          width={48}
          height={48}
          className="block size-12 object-contain"
        />
      </div>
    </Card>
  )
}

export default TechStack