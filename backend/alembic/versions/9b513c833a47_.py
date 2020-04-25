"""empty message

Revision ID: 9b513c833a47
Revises: ec58320e7054
Create Date: 2020-04-25 11:40:33.662768

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9b513c833a47'
down_revision = 'ec58320e7054'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('city_parts', sa.Column('cityPart', sa.String(), nullable=False))
    op.drop_column('city_parts', 'city_part')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('city_parts', sa.Column('city_part', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_column('city_parts', 'cityPart')
    # ### end Alembic commands ###
